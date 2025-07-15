import { useQuery } from '@tanstack/react-query'
import type { Brand, GraphqlResponse } from '@/types'
import { graphql } from '@/integrations/hono-graphql'

export function useGetBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const result: GraphqlResponse<{
        brands: { items: Brand }
      }> = await graphql(`
        query MyQuery {
          brands {
            items {
              brandNFTId
              name
              nib
              metadataURI
              metadata
              blockNumber
              blockTimestamp
              transactionHash
              logIndex
            }
          }
        }
      `)
      return result
    },
  })
}
