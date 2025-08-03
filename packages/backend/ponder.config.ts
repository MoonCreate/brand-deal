import { createConfig } from "ponder";
import { CreatorABI } from "./abis/CreatorABI";
import { CampaignABI } from "./abis/CampaignABI";
import { BrandABI } from "./abis/BrandABI";
import { BrandDealABI } from "./abis/BrandDealABI";

export default createConfig({
  chains: {
    etherlinkTestnet: {
      id: 128123,
      rpc: "https://128123.rpc.thirdweb.com/3c293f82e6e77f130220ed84ebce68cf",
      disableCache: false,
      pollingInterval: 10000,
      maxRequestsPerSecond: 50,
    },
  },

  contracts: {
    Brand: {
      chain: "etherlinkTestnet",
      abi: BrandABI,
      address: process.env.BRAND_ADDRESS as `0x${string}`,
      startBlock: 20872347,
      // endBlock: 24459809,
    },
    Creator: {
      chain: "etherlinkTestnet",
      abi: CreatorABI,
      address: process.env.CREATOR_ADDRESS as `0x${string}`,
      startBlock: 20872347,
      // endBlock: 24459809,
    },
    Campaign: {
      chain: "etherlinkTestnet",
      abi: CampaignABI,
      startBlock: 20872347,
      // endBlock: 24459809,
      address: process.env.CAMPAIGN_ADDRESS as `0x${string}`
    },
    BrandDeal: {
      chain: "etherlinkTestnet",
      abi: BrandDealABI,
      startBlock: 20872347,
      // endBlock: 24459809,
      address: process.env.BRAND_DEAL_ADDRESS as `0x${string}`
    },
  },
});