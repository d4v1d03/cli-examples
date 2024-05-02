// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { Document } from "@blockflow-labs/utils";

export class Transfer {
  static entity = "Transfer";
  static schema = {
    id: { type: "String", index: true },
    from_address: "string",
    to_address: "string",
    token_address: "string",
    token_id: "string",
    transfer_type: "string",
    transaction_from_address: "string",
    transaction_to_address: "string",
    transaction_hash: "string",
    log_index: "string",
    block_timestamp: "string",
    block_hash: "string",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Balance {
  static entity = "Balance";
  static schema = {
    id: { type: "String", index: true },
    address: "string",
    token_address: "string",
    balance: "string",
    block_timestamp: "string",
    block_hash: "string",
    is_past_holder: "boolean",
    is_holder: "boolean",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Token {
  static entity = "Token";
  static schema = {
    id: { type: "String", index: true },
    address: "string",
    holder_count: "string",
    burn_event_count: "string",
    mint_event_count: "string",
    transfer_event_count: "string",
    total_supply: "string",
    total_burned: "string",
    total_minted: "string",
    total_transferred: "string",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

import { String, Array } from "@blockflow-labs/utils";

export interface ITransfer extends Document {
  id: String;
  from_address: string;
  to_address: string;
  token_address: string;
  token_id: string;
  transfer_type: string; // mint burn transfer
  transaction_from_address: string;
  transaction_to_address: string;
  transaction_hash: string;
  log_index: string;
  block_timestamp: string;
  block_hash: string;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IBalance extends Document {
  id: String; // user address
  address: string; // user address
  token_address: string;
  balance: string; // total nft it owns
  block_timestamp: string; // last block where any interaction from this add happens
  block_hash: string;
  is_past_holder: boolean; // if this holder had any past nfts
  is_holder: boolean; // is current holder of any nft?
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IToken extends Document {
  id: String;
  address: string;
  holder_count: string;
  burn_event_count: string;
  mint_event_count: string;
  transfer_event_count: string;
  total_supply: string;
  total_burned: string;
  total_minted: string;
  total_transferred: string;
  blocknumber: String;
  entityId: String;
  chainId: String;
}
