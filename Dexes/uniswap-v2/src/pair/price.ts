import { BigNumber } from "bignumber.js";
import { Instance } from "@blockflow-labs/utils";

import { IBundle, IPair, IToken, ITokenToPair } from "../types/schema";
import { UNTRACKED_PAIRS, ZERO_BI, ONE_BI } from "./helper";

// token where amounts should contribute to tracked volume and liquidity
let WHITELIST: string[] = [
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
  "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  "0x0000000000085d4780b73119b644ae5ecd22b376", // TUSD
  "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643", // cDAI
  "0x39aa39c021dfbae8fac545936693ac917d5e7563", // cUSDC
  "0x86fadb80d8d2cff3c3680819e4da99c10232ba0f", // EBASE
  "0x57ab1ec28d129707052df4df418d58a2d46d5f51", // sUSD
  "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2", // MKR
  "0xc00e94cb662c3520282e6f5717214004a7f26888", // COMP
  "0x514910771af9ca656af840dff83e8264ecf986ca", //LINK
  "0x960b236a07cf122663c4303350609a66a7b288c0", //ANT
  "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f", //SNX
  "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e", //YFI
  "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8", // yCurv
  "0x853d955acef822db058eb8505911ed77f175b99e", // FRAX
  "0xa47c8bf37f92abed4a126bda807a7b7498661acd", // WUST
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // UNI
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // WBTC
  "0x956f47f50a910163d8bf957cf5846d573e7f87ca", // FEI
];

const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const USDC_WETH_PAIR = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"; // created 10008355
const DAI_WETH_PAIR = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"; // created block 10042267
const USDT_WETH_PAIR = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"; // created block 10093341

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
let MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigNumber("400000").toString();

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigNumber("2").toString();

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
  tokenAmount0: string,
  token0: IToken,
  tokenAmount1: string,
  token1: IToken,
  pair: IPair,
  bundle: IBundle
) {
  let price0 = new BigNumber(token0.derivedETH)
    .times(bundle.ethPrice)
    .toString();
  let price1 = new BigNumber(token1.derivedETH)
    .times(bundle.ethPrice)
    .toString();

  // dont count tracked volume on these pairs - usually rebass tokens
  if (UNTRACKED_PAIRS.includes(pair.id)) return ZERO_BI.toString();

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (new BigNumber(pair.liquidityProviderCount).lt(5)) {
    let reserve0USD = new BigNumber(pair.reserve0).times(price0);
    let reserve1USD = new BigNumber(pair.reserve1).times(price1);

    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BI.toString();
      }
    }

    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BI.toString();
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BI.toString();
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount0)
      .times(price0)
      .plus(new BigNumber(tokenAmount1).times(price1))
      .div(2)
      .toString();
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount0).times(price0).toString();
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount1).times(price1).toString();
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BI.toString();
}

export async function findEthPerToken(
  token: string,
  pairDB: Instance,
  registryDB: Instance,
  tokenDB: Instance
) {
  if (token == WETH_ADDRESS) return ONE_BI.toString();

  // loop through whitelist and check if paired with any
  for (let i = 0; i < WHITELIST.length; ++i) {
    const [token0, token1] =
      token.toLowerCase() > WHITELIST[i].toLowerCase()
        ? [WHITELIST[i].toLowerCase(), token.toLowerCase()]
        : [token.toLowerCase(), WHITELIST[i].toLowerCase()];

    let registry: ITokenToPair = await registryDB.findOne({
      id: `${token0}-${token1}`,
    });

    if (!registry) continue;

    // prettier-ignore
    if (registry.pair !== "") {
      let pair: IPair = await pairDB.findOne({id: registry.pair.toLowerCase()});
      if (pair.token0 == token && new BigNumber(pair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token1: IToken = await tokenDB.findOne({id: pair.token1.toLowerCase()});
        return new BigNumber(pair.token1Price).times(token1.derivedETH).toString(); // return token1 per our token * Eth per token 1
      }

      if (pair.token1 == token && new BigNumber(pair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token0: IToken = await tokenDB.findOne({id: pair.token0.toLowerCase()});
        return new BigNumber(pair.token0Price).times(token0.derivedETH).toString(); // return token0 per our token * ETH per token 0
      }
    }
  }

  return ZERO_BI.toString(); // nothing was found return 0
}

export async function getEthPriceInUSD(pairDB: Instance) {
  // fetch eth prices for each stablecoin
  let daiPair: IPair = await pairDB.findOne({
    id: DAI_WETH_PAIR.toLowerCase(),
  });

  let usdcPair: IPair = await pairDB.findOne({
    id: USDC_WETH_PAIR.toLowerCase(),
  });

  let usdtPair: IPair = await pairDB.findOne({
    id: USDT_WETH_PAIR.toLowerCase(),
  });

  // all 3 have been created
  if (daiPair && usdcPair && usdtPair) {
    let totalLiquidityETH = new BigNumber(daiPair.reserve1)
      .plus(usdcPair.reserve1)
      .plus(usdtPair.reserve0);

    let daiWeight = new BigNumber(daiPair.reserve1).div(totalLiquidityETH);
    let usdcWeight = new BigNumber(usdcPair.reserve1).div(totalLiquidityETH);
    let usdtWeight = new BigNumber(usdtPair.reserve0).div(totalLiquidityETH);

    return new BigNumber(daiPair.token0Price)
      .times(daiWeight)
      .plus(new BigNumber(usdcPair.token0Price).times(usdcWeight))
      .plus(new BigNumber(usdtPair.token1Price).times(usdtWeight))
      .toString();

    // dai and USDC have been created
  } else if (daiPair && usdcPair) {
    let totalLiquidityETH = new BigNumber(daiPair.reserve1).plus(
      usdcPair.reserve1
    );
    let daiWeight = new BigNumber(daiPair.reserve1).div(totalLiquidityETH);
    let usdcWeight = new BigNumber(usdcPair.reserve1).div(totalLiquidityETH);
    return new BigNumber(daiPair.token0Price)
      .times(daiWeight)
      .plus(new BigNumber(usdcPair.token0Price).times(usdcWeight))
      .toString();
    // USDC is the only pair so far
  } else if (usdcPair) {
    return new BigNumber(usdcPair.token0Price).toString();
  } else {
    return ZERO_BI.toString();
  }
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUSD(
  tokenAmount0: string,
  token0: IToken,
  tokenAmount1: string,
  token1: IToken,
  ethprice: string
) {
  let price0 = new BigNumber(token0.derivedETH).times(ethprice);
  let price1 = new BigNumber(token1.derivedETH).times(ethprice);

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount0)
      .times(price0)
      .plus(new BigNumber(tokenAmount1).times(price1))
      .toString();
  }

  // take double value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount0).times(price0).times(2);
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return new BigNumber(tokenAmount1).times(price1).times(2);
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BI.toString();
}
