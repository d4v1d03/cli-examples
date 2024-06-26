interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalsupply: string;
}

export const tokens: Record<string, TokenInfo> = {
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 18,
    totalsupply: "15547489789822",
  },
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    totalsupply: "2973735553787252353450352",
  },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    totalsupply: "26852345352838810",
  },
  "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6": {
    name: "Wise Token",
    symbol: "WISE",
    decimals: 18,
    totalsupply: "486084534658361727440662002",
  },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    totalsupply: "48999356520373530",
  },
  "0x6b175474e89094c44da98b954eedeac495271d0f": {
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    totalsupply: "3226126823450226687134629136",
  },
  "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2": {
    name: "Maker",
    symbol: "MKR",
    decimals: 18,
    totalsupply: "977631036950888222010062",
  },
  "0x853d955acef822db058eb8505911ed77f175b99e": {
    name: "Frax",
    symbol: "FRAX",
    decimals: 18,
    totalsupply: "649462235510510991027735564",
  },
  "0x514910771af9ca656af840dff83e8264ecf986ca": {
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
    totalsupply: "1000000000000000000000000000",
  },
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    totalsupply: "1000000000000000000000000000",
  },
  "0x6982508145454ce325ddbe47a25d4ec3d2311933": {
    name: "Pepe",
    symbol: "PEPE",
    decimals: 18,
    totalsupply: "420689899999994793099999999997400",
  },
  "0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44": {
    name: "Whiteheart Token",
    symbol: "WHITE",
    decimals: 18,
    totalsupply: "8888000000000000000000",
  },
};
