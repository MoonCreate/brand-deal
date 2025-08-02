import { createConfig } from "ponder";
import { CreatorABI } from "./abis/CreatorABI";
import { CampaignABI } from "./abis/CampaignABI";
import { BrandABI } from "./abis/BrandABI";
import { BrandDealABI } from "./abis/BrandDealABI";

export default createConfig({
  chains: {
    liskTestnet: {
      id: 4202,
      rpc: "https://rpc.sepolia-api.lisk.com",
      disableCache: false,
    },
  },

  contracts: {
    Brand: {
      chain: "liskTestnet",
      abi: BrandABI,
      address: process.env.BRAND_ADDRESS as `0x${string}`,
      startBlock: 24391095,
      // endBlock: 24459809,
    },
    Creator: {
      chain: "liskTestnet",
      abi: CreatorABI,
      address: process.env.CREATOR_ADDRESS as `0x${string}`,
      startBlock: 24391095,
      // endBlock: 24459809,
    },
    Campaign: {
      chain: "liskTestnet",
      abi: CampaignABI,
      startBlock: 24391095,
      // endBlock: 24459809,
      address: process.env.CAMPAIGN_ADDRESS as `0x${string}`
    },
    BrandDeal: {
      chain: "liskTestnet",
      abi: BrandDealABI,
      startBlock: 24391095,
      // endBlock: 24459809,
      address: process.env.BRAND_DEAL_ADDRESS as `0x${string}`
    },
  },
  blocks: {
    ChainlinkOracleUpdate: {
      chain: "liskTestnet",
      interval: 10, // Every 10 blocks
      startBlock: 24391095,
    },
  },
});