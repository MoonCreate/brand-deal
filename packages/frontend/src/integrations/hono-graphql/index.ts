import { useQuery } from '@tanstack/react-query'
import { Mobius } from 'graphql-mobius'
import type { CreateQuery } from 'graphql-mobius'
import type { Brand, Selective } from '@/types'

export async function graphql(query: string) {
  return fetch(import.meta.env.VITE_GRAPHQL_SERVER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json())
}

type Declaration = `
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Meta {
    status: JSON
  }

  type Query {
    brand(brandWalletAddress: String!): brand
    brands(where: brandFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): brandPage!
    creator(creatorWalletAddress: String!): creator
    creators(where: creatorFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): creatorPage!
    creatorPool(id: String!): creatorPool
    creatorPools(where: creatorPoolFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): creatorPoolPage!
    campaign(campaignNFTId: BigInt!): campaign
    campaigns(where: campaignFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): campaignPage!
    _meta: Meta
  }

  type brand {
    brandWalletAddress: String!
    brandNFTId: BigInt
    name: String
    nib: BigInt
    metadataURI: String
    metadata: JSON
    blockNumber: BigInt
    blockTimestamp: BigInt
    transactionHash: String
    logIndex: String
    brandCampaigns(where: campaignFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): campaignPage
  }

  type campaignPage {
    items: [campaign!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type campaign {
    campaignNFTId: BigInt!
    stakedAmount: BigInt
    brandWalletAddress: String
    creatorWalletAddress: String
    deadline: BigInt
    metadataURI: String
    metadata: JSON
    submitMetadataURI: String
    status: campaignStatus
    blockNumber: BigInt
    blockTimestamp: BigInt
    transactionHash: String
    brand: brand
    creator: creator
    creatorPools(where: creatorPoolFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): creatorPoolPage
  }

  enum campaignStatus {
    Pending
    OpenForApplication
    Assigned
    UnderReview
    Approved
    Disputed
    TimedOut
    CompletedAndPaid
  }

  type creator {
    creatorWalletAddress: String!
    creatorNFTId: BigInt
    name: String
    metadataURI: String
    metadata: JSON
    blockNumber: BigInt
    blockTimestamp: BigInt
    transactionHash: String
    logIndex: String
    creatorCampaigns(where: campaignFilter, orderBy: String, orderDirection: String, before: String, after: String, limit: Int): campaignPage
  }

  input campaignFilter {
    AND: [campaignFilter]
    OR: [campaignFilter]
    campaignNFTId: BigInt
    campaignNFTId_not: BigInt
    campaignNFTId_in: [BigInt]
    campaignNFTId_not_in: [BigInt]
    campaignNFTId_gt: BigInt
    campaignNFTId_lt: BigInt
    campaignNFTId_gte: BigInt
    campaignNFTId_lte: BigInt
    stakedAmount: BigInt
    stakedAmount_not: BigInt
    stakedAmount_in: [BigInt]
    stakedAmount_not_in: [BigInt]
    stakedAmount_gt: BigInt
    stakedAmount_lt: BigInt
    stakedAmount_gte: BigInt
    stakedAmount_lte: BigInt
    brandWalletAddress: String
    brandWalletAddress_not: String
    brandWalletAddress_in: [String]
    brandWalletAddress_not_in: [String]
    brandWalletAddress_contains: String
    brandWalletAddress_not_contains: String
    brandWalletAddress_starts_with: String
    brandWalletAddress_ends_with: String
    brandWalletAddress_not_starts_with: String
    brandWalletAddress_not_ends_with: String
    creatorWalletAddress: String
    creatorWalletAddress_not: String
    creatorWalletAddress_in: [String]
    creatorWalletAddress_not_in: [String]
    creatorWalletAddress_contains: String
    creatorWalletAddress_not_contains: String
    creatorWalletAddress_starts_with: String
    creatorWalletAddress_ends_with: String
    creatorWalletAddress_not_starts_with: String
    creatorWalletAddress_not_ends_with: String
    deadline: BigInt
    deadline_not: BigInt
    deadline_in: [BigInt]
    deadline_not_in: [BigInt]
    deadline_gt: BigInt
    deadline_lt: BigInt
    deadline_gte: BigInt
    deadline_lte: BigInt
    metadataURI: String
    metadataURI_not: String
    metadataURI_in: [String]
    metadataURI_not_in: [String]
    metadataURI_contains: String
    metadataURI_not_contains: String
    metadataURI_starts_with: String
    metadataURI_ends_with: String
    metadataURI_not_starts_with: String
    metadataURI_not_ends_with: String
    submitMetadataURI: String
    submitMetadataURI_not: String
    submitMetadataURI_in: [String]
    submitMetadataURI_not_in: [String]
    submitMetadataURI_contains: String
    submitMetadataURI_not_contains: String
    submitMetadataURI_starts_with: String
    submitMetadataURI_ends_with: String
    submitMetadataURI_not_starts_with: String
    submitMetadataURI_not_ends_with: String
    status: campaignStatus
    status_not: campaignStatus
    status_in: [campaignStatus]
    status_not_in: [campaignStatus]
    blockNumber: BigInt
    blockNumber_not: BigInt
    blockNumber_in: [BigInt]
    blockNumber_not_in: [BigInt]
    blockNumber_gt: BigInt
    blockNumber_lt: BigInt
    blockNumber_gte: BigInt
    blockNumber_lte: BigInt
    blockTimestamp: BigInt
    blockTimestamp_not: BigInt
    blockTimestamp_in: [BigInt]
    blockTimestamp_not_in: [BigInt]
    blockTimestamp_gt: BigInt
    blockTimestamp_lt: BigInt
    blockTimestamp_gte: BigInt
    blockTimestamp_lte: BigInt
    transactionHash: String
    transactionHash_not: String
    transactionHash_in: [String]
    transactionHash_not_in: [String]
    transactionHash_contains: String
    transactionHash_not_contains: String
    transactionHash_starts_with: String
    transactionHash_ends_with: String
    transactionHash_not_starts_with: String
    transactionHash_not_ends_with: String
  }

  type creatorPoolPage {
    items: [creatorPool!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type creatorPool {
    id: String!
    campaignNFTId: BigInt
    creatorWalletAddress: String
    campaign: campaign
    creator: creator
  }

  input creatorPoolFilter {
    AND: [creatorPoolFilter]
    OR: [creatorPoolFilter]
    id: String
    id_not: String
    id_in: [String]
    id_not_in: [String]
    id_contains: String
    id_not_contains: String
    id_starts_with: String
    id_ends_with: String
    id_not_starts_with: String
    id_not_ends_with: String
    campaignNFTId: BigInt
    campaignNFTId_not: BigInt
    campaignNFTId_in: [BigInt]
    campaignNFTId_not_in: [BigInt]
    campaignNFTId_gt: BigInt
    campaignNFTId_lt: BigInt
    campaignNFTId_gte: BigInt
    campaignNFTId_lte: BigInt
    creatorWalletAddress: String
    creatorWalletAddress_not: String
    creatorWalletAddress_in: [String]
    creatorWalletAddress_not_in: [String]
    creatorWalletAddress_contains: String
    creatorWalletAddress_not_contains: String
    creatorWalletAddress_starts_with: String
    creatorWalletAddress_ends_with: String
    creatorWalletAddress_not_starts_with: String
    creatorWalletAddress_not_ends_with: String
  }

  type brandPage {
    items: [brand!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input brandFilter {
    AND: [brandFilter]
    OR: [brandFilter]
    brandWalletAddress: String
    brandWalletAddress_not: String
    brandWalletAddress_in: [String]
    brandWalletAddress_not_in: [String]
    brandWalletAddress_contains: String
    brandWalletAddress_not_contains: String
    brandWalletAddress_starts_with: String
    brandWalletAddress_ends_with: String
    brandWalletAddress_not_starts_with: String
    brandWalletAddress_not_ends_with: String
    brandNFTId: BigInt
    brandNFTId_not: BigInt
    brandNFTId_in: [BigInt]
    brandNFTId_not_in: [BigInt]
    brandNFTId_gt: BigInt
    brandNFTId_lt: BigInt
    brandNFTId_gte: BigInt
    brandNFTId_lte: BigInt
    name: String
    name_not: String
    name_in: [String]
    name_not_in: [String]
    name_contains: String
    name_not_contains: String
    name_starts_with: String
    name_ends_with: String
    name_not_starts_with: String
    name_not_ends_with: String
    nib: BigInt
    nib_not: BigInt
    nib_in: [BigInt]
    nib_not_in: [BigInt]
    nib_gt: BigInt
    nib_lt: BigInt
    nib_gte: BigInt
    nib_lte: BigInt
    metadataURI: String
    metadataURI_not: String
    metadataURI_in: [String]
    metadataURI_not_in: [String]
    metadataURI_contains: String
    metadataURI_not_contains: String
    metadataURI_starts_with: String
    metadataURI_ends_with: String
    metadataURI_not_starts_with: String
    metadataURI_not_ends_with: String
    blockNumber: BigInt
    blockNumber_not: BigInt
    blockNumber_in: [BigInt]
    blockNumber_not_in: [BigInt]
    blockNumber_gt: BigInt
    blockNumber_lt: BigInt
    blockNumber_gte: BigInt
    blockNumber_lte: BigInt
    blockTimestamp: BigInt
    blockTimestamp_not: BigInt
    blockTimestamp_in: [BigInt]
    blockTimestamp_not_in: [BigInt]
    blockTimestamp_gt: BigInt
    blockTimestamp_lt: BigInt
    blockTimestamp_gte: BigInt
    blockTimestamp_lte: BigInt
    transactionHash: String
    transactionHash_not: String
    transactionHash_in: [String]
    transactionHash_not_in: [String]
    transactionHash_contains: String
    transactionHash_not_contains: String
    transactionHash_starts_with: String
    transactionHash_ends_with: String
    transactionHash_not_starts_with: String
    transactionHash_not_ends_with: String
    logIndex: String
    logIndex_not: String
    logIndex_in: [String]
    logIndex_not_in: [String]
    logIndex_contains: String
    logIndex_not_contains: String
    logIndex_starts_with: String
    logIndex_ends_with: String
    logIndex_not_starts_with: String
    logIndex_not_ends_with: String
  }

  type creatorPage {
    items: [creator!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input creatorFilter {
    AND: [creatorFilter]
    OR: [creatorFilter]
    creatorWalletAddress: String
    creatorWalletAddress_not: String
    creatorWalletAddress_in: [String]
    creatorWalletAddress_not_in: [String]
    creatorWalletAddress_contains: String
    creatorWalletAddress_not_contains: String
    creatorWalletAddress_starts_with: String
    creatorWalletAddress_ends_with: String
    creatorWalletAddress_not_starts_with: String
    creatorWalletAddress_not_ends_with: String
    creatorNFTId: BigInt
    creatorNFTId_not: BigInt
    creatorNFTId_in: [BigInt]
    creatorNFTId_not_in: [BigInt]
    creatorNFTId_gt: BigInt
    creatorNFTId_lt: BigInt
    creatorNFTId_gte: BigInt
    creatorNFTId_lte: BigInt
    name: String
    name_not: String
    name_in: [String]
    name_not_in: [String]
    name_contains: String
    name_not_contains: String
    name_starts_with: String
    name_ends_with: String
    name_not_starts_with: String
    name_not_ends_with: String
    metadataURI: String
    metadataURI_not: String
    metadataURI_in: [String]
    metadataURI_not_in: [String]
    metadataURI_contains: String
    metadataURI_not_contains: String
    metadataURI_starts_with: String
    metadataURI_ends_with: String
    metadataURI_not_starts_with: String
    metadataURI_not_ends_with: String
    blockNumber: BigInt
    blockNumber_not: BigInt
    blockNumber_in: [BigInt]
    blockNumber_not_in: [BigInt]
    blockNumber_gt: BigInt
    blockNumber_lt: BigInt
    blockNumber_gte: BigInt
    blockNumber_lte: BigInt
    blockTimestamp: BigInt
    blockTimestamp_not: BigInt
    blockTimestamp_in: [BigInt]
    blockTimestamp_not_in: [BigInt]
    blockTimestamp_gt: BigInt
    blockTimestamp_lt: BigInt
    blockTimestamp_gte: BigInt
    blockTimestamp_lte: BigInt
    transactionHash: String
    transactionHash_not: String
    transactionHash_in: [String]
    transactionHash_not_in: [String]
    transactionHash_contains: String
    transactionHash_not_contains: String
    transactionHash_starts_with: String
    transactionHash_ends_with: String
    transactionHash_not_starts_with: String
    transactionHash_not_ends_with: String
    logIndex: String
    logIndex_not: String
    logIndex_in: [String]
    logIndex_not_in: [String]
    logIndex_contains: String
    logIndex_not_contains: String
    logIndex_starts_with: String
    logIndex_ends_with: String
    logIndex_not_starts_with: String
    logIndex_not_ends_with: String
  }
`

type Scalars = {
  BigInt: `${number}`
  JSON: any 
  BrandMetadata: Brand['metadata']
}
export const mobius = new Mobius<Declaration, Scalars>({
  url: import.meta.env.VITE_GRAPHQL_SERVER,
})

type Klein = NonNullable<typeof mobius.klein>

// @ts-expect-error its so deep it reaches the deep heart
export const useMobiusQuery = <
  TQuery extends Selective<CreateQuery<Klein['Query']>>,
>(
  query: TQuery,
) => {
  return useQuery({ queryKey: [query], queryFn: () => mobius.query(query) })
}
