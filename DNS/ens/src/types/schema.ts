// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { Document } from "@blockflow-labs/utils";

export class Account {
  static entity = "Account";
  static schema = {
    id: { type: "String", index: true },
    domains: ["String"],
    wrappedDomains: ["String"],
    registrations: ["String"],
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Registration {
  static entity = "Registration";
  static schema = {
    id: { type: "String", index: true },
    domain: "String",
    registrationDate: "Number",
    expiryDate: "Number",
    cost: "Number",
    registrant: "String",
    labelName: "String",
    events: ["String"],
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class RegistrationEvent {
  static entity = "RegistrationEvent";
  static schema = {
    id: { type: "String", index: true },
    blockNumber: "Number",
    transactionID: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class WrappedDomain {
  static entity = "WrappedDomain";
  static schema = {
    id: { type: "String", index: true },
    expiryDate: "Number",
    fuses: "Number",
    name: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Domain {
  static entity = "Domain";
  static schema = {
    id: { type: "String", index: true },
    name: "String",
    labelName: "String",
    labelhash: "String",
    parent: "String",
    subdomains: ["String"],
    subdomainCount: "Number",
    resolvedAddress: "String",
    owner: "String",
    resolver: "String",
    ttl: "Number",
    isMigrated: "Boolean",
    createdAt: "Number",
    registrant: "String",
    wrappedOwner: "String",
    expiryDate: "Number",
    wrappedDomain: "String",
    events: "{ domain: String; blockNumber: Number; transactionID: String; }",
    registration: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Resolver {
  static entity = "Resolver";
  static schema = {
    id: { type: "String", index: true },
    domain: "String",
    address: "String",
    addr: "String",
    contentHash: "String",
    texts: ["String"],
    coinTypes: ["Number"],
    events: "{ resolver: String; blockNumber: Number; transactionID: String; }",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class Transfer {
  static entity = "Transfer";
  static schema = {
    id: { type: "String", index: true },
    domain: "String",
    blockNumber: "Number",
    transactionID: "String",
    owner: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class AddrChanged {
  static entity = "AddrChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    addr: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class MulticoinAddrChanged {
  static entity = "MulticoinAddrChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "string",
    blockNumber: "Number",
    transactionID: "String",
    coinType: "Number",
    addr: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class TextChanged {
  static entity = "TextChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    key: "String",
    value: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class NameChanged {
  static entity = "NameChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    name: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class AbiChanged {
  static entity = "AbiChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    transactionID: "String",
    contentType: "Number",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class PubkeyChanged {
  static entity = "PubkeyChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    x: "String",
    y: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class ContenthashChanged {
  static entity = "ContenthashChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    hash: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class InterfaceChanged {
  static entity = "InterfaceChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    interfaceID: "String",
    implementer: "String",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

export class VersionChanged {
  static entity = "VersionChanged";
  static schema = {
    id: { type: "String", index: true },
    resolver: "String",
    blockNumber: "Number",
    transactionID: "String",
    version: "Number",
    entityId: { type: "String", index: true },
    blocknumber: { type: "Number", index: true },
    chainId: { type: "String", index: true },
  };
}

import { String, Array, Number } from "@blockflow-labs/utils";

export interface IAccount extends Document {
  id: String;
  domains: [String]; // domain ids
  wrappedDomains: [String]; // wrapped domain ids
  registrations: [String]; // registration ids
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IRegistration extends Document {
  id: String;
  domain: String;
  registrationDate: Number;
  expiryDate: Number;
  cost: Number;
  registrant: String;
  labelName: String;
  events: [String];
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IRegistrationEvent extends Document {
  id: String;
  blockNumber: Number;
  transactionID: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IWrappedDomain extends Document {
  id: String;
  expiryDate: Number;
  fuses: Number;
  name: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IDomain extends Document {
  id: String;
  name: String;
  labelName: String;
  labelhash: String;
  parent: String;
  subdomains: [String];
  subdomainCount: Number;
  resolvedAddress: String;
  owner: String;
  resolver: String;
  ttl: Number;
  isMigrated: Boolean;
  createdAt: Number;
  registrant: String;
  wrappedOwner: String;
  expiryDate: Number;
  wrappedDomain: String;
  events: [DomainEvent];
  registration: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

type DomainEvent = {
  domain: String;
  blockNumber: Number;
  transactionID: String;
};

export interface IResolver extends Document {
  id: String;
  domain: String;
  address: String;
  addr: String;
  contentHash: String;
  texts: [String];
  coinTypes: [Number];
  events: [ResolverEvent];
  blocknumber: String;
  entityId: String;
  chainId: String;
}

type ResolverEvent = {
  resolver: String;
  blockNumber: Number;
  transactionID: String;
};

export interface ITransfer extends Document {
  id: String;
  domain: String;
  blockNumber: Number;
  transactionID: String;
  owner: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IAddrChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  addr: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IMulticoinAddrChanged extends Document {
  id: String;
  resolver: string;
  blockNumber: Number;
  transactionID: String;
  coinType: Number;
  addr: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface ITextChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  key: String;
  value: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface INameChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  name: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IAbiChanged extends Document {
  id: String;
  resolver: String;
  transactionID: String;
  contentType: Number;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IPubkeyChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  x: String;
  y: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IContenthashChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  hash: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface InterfaceChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  interfaceID: String;
  implementer: String;
  blocknumber: String;
  entityId: String;
  chainId: String;
}

export interface IVersionChanged extends Document {
  id: String;
  resolver: String;
  blockNumber: Number;
  transactionID: String;
  version: Number;
  blocknumber: String;
  entityId: String;
  chainId: String;
}
