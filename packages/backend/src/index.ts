import { db } from "ponder:api";
import { ponder } from "ponder:registry";
import { brand, creator, campaign, creatorPool } from "ponder:schema";

ponder.on("BrandDeal:CreatorRegistered", async ({ event, context }) => {
  const { creatorNFTId, creatorAddress, name, metadataURI } = event.args;

  const resMetadata = await fetch(metadataURI);
  const metadata = await resMetadata.json()

  await context.db.insert(creator).values({
    creatorWalletAddress: creatorAddress,
    creatorNFTId: creatorNFTId,
    name: name,
    metadataURI: metadataURI,
    metadata: metadata,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    logIndex: event.log.logIndex.toString(),
  });
});

ponder.on("BrandDeal:BrandRegistered", async ({ event, context }) => {
  const { brandNFTId, brandAddress, name, NIB, metadataURI } = event.args;
  
  const resMetadata = await fetch(metadataURI);
  const metadata = await resMetadata.json()

  await context.db.insert(brand).values({
    brandWalletAddress: brandAddress,
    brandNFTId: brandNFTId,
    name: name,
    nib: NIB,
    metadataURI: metadataURI,
    metadata: metadata,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    logIndex: event.log.logIndex.toString(),
  });
});

ponder.on("BrandDeal:CampaignCreated", async ({ event, context }) => {
  const { campaignNFTId, ownerCampaign, stakedAmount, campaignDeadline, campaignMetadataURI } = event.args;

  const resMetadata = await fetch(campaignMetadataURI);
  const metadata = await resMetadata.json();

  await context.db.insert(campaign).values({
    campaignNFTId: campaignNFTId,
    stakedAmount: stakedAmount,
    brandWalletAddress: ownerCampaign,
    creatorWalletAddress: '0x0',
    deadline: campaignDeadline,
    metadataURI: campaignMetadataURI,
    metadata: metadata,
    submitMetadataURI: '-',
    status: "OpenForApplication",
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    logIndex: event.log.logIndex.toString(),
  });
});


ponder.on("Campaign:CreatorApply", async ({ event, context }) => {
  const { campaignId, creator } = event.args;
  const id = `${campaignId}-${creator}`;
  const isExist = await context.db.find(creatorPool, { id: id })
  if (!isExist) {
    await context.db.insert(creatorPool).values({
      id: id,
      campaignNFTId: campaignId,
      creatorWalletAddress: creator,
    });
  }
});

ponder.on("Campaign:CreatorCancelledApplyForCampaign", async ({ event, context }) => {
  const { campaignId, creator } = event.args;
  const id = `${campaignId}-${creator}`;
  
  await context.db.delete(creatorPool, {
    id: id
  });
});

ponder.on("BrandDeal:CreatorAssigned", async ({ event, context }) => {
  const { campaignId, creatorAddress } = event.args;


  await context.db.update(campaign, { campaignNFTId: campaignId }).set({
    creatorWalletAddress: creatorAddress,
    // deadline: deadline,
    status: 'Assigned'
  })
});

ponder.on("BrandDeal:SubmitTaskCreator", async ({ event, context }) => {
  const { campaignId, submitMetadataUri } = event.args;

  await context.db.update(campaign, { campaignNFTId: campaignId }).set({
    status: 'UnderReview',
    submitMetadataURI: submitMetadataUri
  })
});

ponder.on("BrandDeal:ResolveCampaign", async ({ event, context }) => {
  const { campaignId } = event.args;

  await context.db.update(campaign, { campaignNFTId: campaignId }).set({
    status: 'CompletedAndPaid'
  })
});