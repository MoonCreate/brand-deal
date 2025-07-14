import { createConfig } from "ponder";
import { CreatorABI } from "./abis/CreatorABI";
import { CampaignABI } from "./abis/CampaignABI";
import { BrandABI } from "./abis/BrandABI";
import { BrandDealABI } from "./abis/BrandDealABI";

export default createConfig({
  chains: {
    anvil: {
      id: 31337,
      rpc: "http://127.0.0.1:8545/",
      disableCache: false,
    },
  },

  contracts: {
    Brand: {
      chain: "anvil",
      abi: BrandABI,
      address: process.env.BRAND_ADDRESS as `0x${string}`,
      startBlock: 1,
      // endBlock: 24459809,
    },
    Creator: {
      chain: "anvil",
      abi: CreatorABI,
      address: process.env.CREATOR_ADDRESS as `0x${string}`,
      startBlock: 1,
      // endBlock: 24459809,
    },
    Campaign: {
      chain: "anvil",
      abi: CampaignABI,
      startBlock: 1,
      // endBlock: 24459809,
      address: process.env.CAMPAIGN_ADDRESS as `0x${string}`
    },
    BrandDeal: {
      chain: "anvil",
      abi: BrandDealABI,
      startBlock: 1,
      // endBlock: 24459809,
      address: process.env.BRAND_DEAL_ADDRESS as `0x${string}`
    },
  },
  blocks: {
    ChainlinkOracleUpdate: {
      chain: "anvil",
      interval: 10, // Every 10 blocks
      startBlock: 1000,
    },
  },
});