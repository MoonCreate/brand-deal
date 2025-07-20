import { useQuery } from '@tanstack/react-query'
import type { Creator, GraphqlResponse } from '@/types'
import { graphql } from '@/integrations/hono-graphql'

export function useGetCreators() {
  return useQuery({
    queryKey: ['creators'],
    queryFn: async () => {
      const result: GraphqlResponse<{
        creators: {
          items: Array<Creator>
        }
      }> = await graphql(`
        query MyQuery {
          creators {
            items {
              creatorNFTId
              name
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
