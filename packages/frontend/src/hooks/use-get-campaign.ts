import { useQuery } from '@tanstack/react-query'
import type { Campaign, GraphqlResponse } from '@/types'
import { graphql } from '@/integrations/hono-graphql'

export function useGetCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const result: GraphqlResponse<{
        campaigns: { items: Campaign }
      }> = await graphql(`
        query MyQuery {
          campaigns {
            items {
              stakedAmount
              brandWalletAddress
              creatorWalletAddress
              deadline
              metadataURI
              metadata
              submitMetadataURI
              status
              blockNumber
              blockTimestamp
              transactionHash
            }
          }
        }
      `)
      return result
    },
  })
}
