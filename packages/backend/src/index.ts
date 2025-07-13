import { ponder } from "ponder:registry";
import { brand, creator, campaign, creatorPool } from "ponder:schema";

ponder.on("PlatformCore:CreatorRegistered", async ({ event, context }) => {
  const { creatorNFTId, creatorAddress, name, metadataURI } = event.args;

  const resMetadata = await fetch(metadataURI);
  const metadata = await resMetadata.json()

  console.log(metadata, "creator")
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

ponder.on("PlatformCore:BrandRegistered", async ({ event, context }) => {
  const { brandNFTId, brandAddress, name, metadataURI } = event.args;
  
  const resMetadata = await fetch(metadataURI);
  const metadata = await resMetadata.json()

  await context.db.insert(brand).values({
    brandWalletAddress: brandAddress,
    brandNFTId: brandNFTId,
    name: name,
    metadataURI: metadataURI,
    metadata: metadata,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    logIndex: event.log.logIndex.toString(),
  });
});

ponder.on("PlatformCore:CampaignCreated", async ({ event, context }) => {
  const { campaignInstanceId, campaignNFTId, brandAddress, stakedAmount, campaignDeadline, campaignMetadataURI } = event.args;

  await context.db.insert(campaign).values({
    campaignInstanceId: campaignInstanceId,
    campaignNFTId: campaignNFTId,
    stakedAmount: stakedAmount,
    brandWalletAddress: brandAddress,
    creatorWalletAddress: '0x0',
    deadline: campaignDeadline,
    metadataURI: campaignMetadataURI,
    status: "OpenForApplication",
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    logIndex: event.log.logIndex.toString(),
  });
});

ponder.on("PlatformCore:CreatorApply", async ({ event, context }) => {
  const { campaignInstanceId, creatorAddress } = event.args;
  const id = `${campaignInstanceId}-${creatorAddress}`;
  await context.db.insert(creatorPool).values({
    id: id,
    campaignInstanceId: campaignInstanceId,
    creatorWalletAddress: creatorAddress,
  });
});

ponder.on("PlatformCore:CreatorWithdraw", async ({ event, context }) => {
  const { campaignInstanceId, creatorAddress } = event.args;
  const id = `${campaignInstanceId}-${creatorAddress}`;

  await context.db.delete(creatorPool, {
    id: id
  });
});