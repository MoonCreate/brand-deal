import { createConfig } from "ponder";
import { CreatorABI } from "./abis/CreatorABI";
import { CampaignABI } from "./abis/CampaignABI";
import { BrandABI } from "./abis/BrandABI";
import { PlatformCoreABI } from "./abis/PlatformCoreABI";
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
    PlatformCore: {
      chain: "anvil",
      abi: PlatformCoreABI,
      startBlock: 1,
      // endBlock: 24459809,
      address: process.env.PLATFORM_CORE_ADDRESS as `0x${string}`
    },
  },
});