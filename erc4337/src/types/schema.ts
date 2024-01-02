// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

export class UserOp {
  static entity = "UserOp";
  static entityId = "3363103d-7643-4a4d-a8ab-ad140fa033b5";
  static schema = {
    id: "string",
    userOpHash: "string",
    sender: "string",
    nonce: "string",
    initCode: "string",
    callData: "string",
    callGasLimit: "string",
    verificationGasLimit: "string",
    preVerificationGas: "string",
    maxFeePerGas: "string",
    maxPriorityFeePerGas: "string",
    paymasterAndData: "string",
    signature: "string",
    beneficiary: "string",
    success: "string",
    actualGasCost: "string",
    actualGasUsed: "string",
    transactionHash: "string",
    blockNumber: "string",
    blockTimeStamp: "string",
    entryPoint: "string",
    entityId: "String",
    blocknumber: { type: "String", index: true },
  };

  static async save(data: any, callback: Function): Promise<void> {
    data.entityId = UserOp.entityId;
    await callback(UserOp.entity, UserOp.schema, data);
  }

  static async load(id: string, callback: Function): Promise<any> {
    const res = await callback(UserOp.entity, UserOp.schema, id);
    res.id = id;
    return res;
  }

  static async bind(): Promise<UserOp> {
    return new UserOp();
  }
}

export class Transaction {
  static entity = "Transaction";
  static entityId = "b3c24a13-dc70-4b55-9e42-c83de3cea91a";
  static schema = {
    id: "string",
    transactionHash: "string",
    userOpHashes: ["string"],
    entityId: "String",
    blocknumber: { type: "String", index: true },
  };

  static async save(data: any, callback: Function): Promise<void> {
    data.entityId = Transaction.entityId;
    await callback(Transaction.entity, Transaction.schema, data);
  }

  static async load(id: string, callback: Function): Promise<any> {
    const res = await callback(Transaction.entity, Transaction.schema, id);
    res.id = id;
    return res;
  }

  static async bind(): Promise<Transaction> {
    return new Transaction();
  }
}

export class Block {
  static entity = "Block";
  static entityId = "f209a6d9-18f6-46fd-a4b9-7bdb8342cbac";
  static schema = {
    id: "string",
    blockNumber: "string",
    transactionHashesWithUserOps: ["string"],
    entityId: "String",
    blocknumber: { type: "String", index: true },
  };

  static async save(data: any, callback: Function): Promise<void> {
    data.entityId = Block.entityId;
    await callback(Block.entity, Block.schema, data);
  }

  static async load(id: string, callback: Function): Promise<any> {
    const res = await callback(Block.entity, Block.schema, id);
    res.id = id;
    return res;
  }

  static async bind(): Promise<Block> {
    return new Block();
  }
}