import { onchainTable, relations, onchainEnum } from "ponder";

export const campaignStatus = onchainEnum("CampaignStatus", [
  "Pending",
  "OpenForApplication",
  "Assigned",
  "UnderReview",
  "Approved",
  "Disputed",
  "TimedOut",
  "CompletedAndPaid",
]);

export const brand = onchainTable("brand", (t) => ({
  brandWalletAddress: t.hex().primaryKey(),
  brandNFTId: t.bigint(),
  name: t.text(),
  nib: t.bigint(),
  metadataURI: t.text(),
  metadata: t.json(),
  blockNumber: t.bigint(),
  blockTimestamp: t.bigint(),
  transactionHash: t.text(),
  logIndex: t.text(),
}));

export const creator = onchainTable(
  "creator",
  (t) => ({
    creatorWalletAddress: t.hex().primaryKey(),
    creatorNFTId: t.bigint(),
    name: t.text(),
    metadataURI: t.text(),
    metadata: t.json(),
    blockNumber: t.bigint(),
    blockTimestamp: t.bigint(),
    transactionHash: t.text(),
    logIndex: t.text(),
  }),
);

export const creatorPool = onchainTable("creatorPool", (t) => ({
  id: t.text().primaryKey(),
  campaignNFTId: t.bigint(),
  creatorWalletAddress: t.hex(),
}));

export const campaign = onchainTable("campaign", (t) => ({
  campaignNFTId: t.bigint().primaryKey(),
  stakedAmount: t.bigint(),
  brandWalletAddress: t.hex(),
  creatorWalletAddress: t.hex(),
  deadline: t.bigint(),
  metadataURI: t.text(),
  metadata: t.json(),
  submitMetadataURI: t.text(),
  status: campaignStatus("CampaignStatus"),
  blockNumber: t.bigint(),
  blockTimestamp: t.bigint(),
  transactionHash: t.text(),
}));


// Brand has many campaigns
export const brandRelations = relations(brand, ({ many }) => ({
  brandCampaigns: many(campaign),
}));

//creator has many campaigns
export const creatorRelations = relations(creator, ({ many, one }) => ({
  creatorCampaigns: many(campaign),
}));

//campaign 
export const campaignRelations = relations(campaign, ({ one, many }) => ({
  brand: one(brand, {
    fields: [campaign.brandWalletAddress],
    references: [brand.brandWalletAddress],
  }),
  creator: one(creator, {
    fields: [campaign.creatorWalletAddress],
    references: [creator.creatorWalletAddress],
  }),
  creatorPools: many(creatorPool)
}));

export const creatorPoolRelations = relations(creatorPool, ({ one }) => ({
  campaign: one(campaign, {
    fields: [creatorPool.campaignNFTId],
    references: [campaign.campaignNFTId]
  }),
  creator: one(creator, {
    fields: [creatorPool.creatorWalletAddress],
    references: [creator.creatorWalletAddress]
  })
}));