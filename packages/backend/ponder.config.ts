import { createConfig, rateLimit } from "ponder";
import { BrandDealABI } from "./abis/BrandDealABI";
import { http } from "viem";

export default createConfig({
  chains: {
    etherlinkTestnet: {
      id: 128123,
      rpc: "https://rpc.ankr.com/etherlink_testnet/a5512d45c31850151736d5ebc1db43b5c470628bc02f49fe28e34c8aeedc4f30",
      ws: "wss://rpc.ankr.com/etherlink_testnet/ws/a5512d45c31850151736d5ebc1db43b5c470628bc02f49fe28e34c8aeedc4f30",
      disableCache: false,
    },
  },

  contracts: {
    BrandDeal: {
      chain: "etherlinkTestnet",
      abi: BrandDealABI,
      startBlock: 20872347,
      address: process.env.BRAND_DEAL_ADDRESS as `0x${string}`,
    },
  },
  blocks: {
    BrandDealIndexer: {
      chain: "etherlinkTestnet",
      interval: 100,         // Set chunk ≤ 100 blok
      startBlock: 20872347, // sama dengan startBlock target Anda
    },
  },
});