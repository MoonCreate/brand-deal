import type { Address } from 'viem'

type NumStr = `${number}`

type LinkType = `${'https' | 'http'}://${string}`

type EmailType = `${string}@${string}`

export type Creator = {
  creatorNFTId: NumStr
  name: Address
  metadataURI: LinkType,
  creatorWalletAddress: Address,
  metadata: {
    name: string
    description: string
    image: string
    attributes: [
      {
        trait_type: 'Role'
        value: 'Creator'
      },
      {
        trait_type: 'Email'
        value: EmailType
      },
      {
        trait_type: 'Location Address'
        value: string
      },
      {
        trait_type: 'Social Links'
        value: Array<{
          type: string
          link: string
        }>
      },
      {
        trait_type: 'Joined Platform'
        value: number
      },
      {
        trait_type: 'Creator Address'
        value: Address
      },
    ]
  }
  blockNumber: NumStr
  blockTimestamp: NumStr
  transactionHash: Address
  logIndex: NumStr
}

export type Campaign = {
  stakedAmount: NumStr
  brandWalletAddress: Address
  creatorWalletAddress: Address
  deadline: NumStr
  metadataURI: LinkType
  metadata: {
    name: string
    description: string
    image: string
    attributes: [
      {
        trait_type: 'Brand Name'
        value: string
      },
      {
        trait_type: 'Staked Budget (WEI)'
        value: NumStr
        display_type: 'number'
      },
      {
        trait_type: 'Prefered Location'
        value: 'online'
      },
    ]
  }
  status:
    | 'Pending'
    | 'OpenForApplication'
    | 'Assigned'
    | 'UnderReview'
    | 'Approved'
    | 'Disputed'
    | 'TimedOut'
    | 'CompletedAndPaid'
  blockNumber: NumStr
  blockTimestamp: NumStr
  transactionHash: Address
}

export type Brand = {
  brandNFTId: NumStr
  name: Address
  nib: NumStr
  metadataURI: LinkType
  brandWalletAddress: NumStr
  metadata: {
    name: string
    image: string
    description: string
    socialLink: Array<{
      type: string
      link: string
    }>
    attributes: [
      { trait_type: 'Role'; value: 'Brand' },
      { trait_type: 'Email'; value: EmailType },
      { trait_type: 'Web'; value: LinkType },
      { trait_type: 'NIB'; value: NumStr },
      {
        trait_type: 'Social Links'
        value: Array<{
          type: string
          link: string
        }>
      },
      { trait_type: 'Joined Platform'; value: number },
      { trait_type: 'Creator Address'; value: NumStr },
    ]
  }
  blockNumber: NumStr
  blockTimestamp: NumStr
  transactionHash: NumStr
  logIndex: NumStr
}

export type GraphqlResponse<T> = {
  data: T
}

export type Selective<T> = T extends object
  ? {
      [K in keyof T]?: K extends 'where' ? T[K] : Selective<T[K]>
    } & ('where' extends keyof T
      ? T['where'] extends NonNullable<T['where']>
        ? {
            // @ts-ignore: always with where
            select: T['Select']
            where: T['where']
          }
        : {}
      : {})
  : T

export type Merge<TLeft, TRight> = {
  [K in keyof TLeft | keyof TRight]: K extends keyof TRight
    ? TRight[K]
    : K extends keyof TLeft
      ? TLeft[K]
      : never
}
