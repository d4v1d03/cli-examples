import { BigNumber } from "bignumber.js";
import { IEventContext, IBind, Instance } from "@blockflow-labs/utils";

import {
  Blockchain,
  Paymaster,
  AccountFactory,
  Account,
} from "../../types/schema";

/**
 * @dev Event::AccountDeployed(bytes32 userOpHash, address sender, address factory, address paymaster)
 * @param context trigger object with contains {event: {userOpHash ,sender ,factory ,paymaster }, transaction, block, log}
 * @param bind init function for database wrapper methods
 */
export const AccountDeployedHandler = async (
  context: IEventContext,
  bind: IBind
) => {
  try {
    // Implement your event handler logic for UserOperationRevertReason here
    const { event, transaction, block } = context;
    let { userOpHash, sender, factory, paymaster } = event;

    sender = sender.toString();
    factory = factory.toString();
    paymaster = paymaster.toString();
    userOpHash = userOpHash.toString();

    await updateBlockchain(bind(Blockchain));
    await updatePaymaster(
      bind(Paymaster),
      block.block_timestamp,
      paymaster,
      userOpHash
    );
    await updateAccountFactory(bind(AccountFactory), factory);

    {
      const accountDB = bind(Account);
      let account = await accountDB.findOne({ id: sender.toLowerCase() });
      account ??= await accountDB.create({
        id: sender.toLowerCase(),
        factory: factory.toLowerCase(),
        paymaster: paymaster.toLowerCase(),
        totalOperations: "0",
        createdAt: block.block_timestamp,
        createdHash: transaction.transaction_hash,
        createdOpHash: userOpHash,
      });

      account.factory = factory.toLowerCase();
      account.updatedAt = block.block_timestamp;

      await accountDB.save(account);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateBlockchain = async (blockchainDB: Instance) => {
  try {
    let blockchain = await blockchainDB.findOne({ id: "ETH" });
    blockchain ??= await blockchainDB.create({ id: "ETH" });

    blockchain.totalAccount = blockchain.totalAccount || 0;
    blockchain.totalAccount = new BigNumber(blockchain.totalAccount)
      .plus(1)
      .toString();

    await blockchainDB.save(blockchain);
  } catch (error) {
    console.error(error);
  }
};

const updatePaymaster = async (
  paymasterDB: Instance,
  timestamp: string,
  id: string,
  userOpHash: string
) => {
  try {
    let paymaster = await paymasterDB.findOne({ id: id.toLowerCase() });
    paymaster ??= await paymasterDB.create({
      id: id.toLowerCase(),
      totalOperations: "0",
      createdAt: timestamp,
    });

    paymaster.ops.push(userOpHash);
    paymaster.updatedAt = timestamp;
    paymaster.totalOperations = new BigNumber(paymaster.totalOperations)
      .plus(1)
      .toString();

    await paymasterDB.save(paymaster);
  } catch (error) {
    console.error(error);
  }
};

const updateAccountFactory = async (Ifactory: Instance, id: string) => {
  try {
    let factory = await Ifactory.findOne({ id: id.toLowerCase() });
    factory ??= await Ifactory.create({
      id: id.toLowerCase(),
      totalAccount: 0,
    });

    factory.totalAccount = factory.totalAccount + 1;

    await Ifactory.save(factory);
  } catch (error) {
    console.error(error);
  }
};
