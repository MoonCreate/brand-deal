import { useQuery } from '@tanstack/react-query'
import type { Creator } from '@/types'
import { mobius } from '@/integrations/hono-graphql'

export function useGetCreatorList() {
  return useQuery({
    queryKey: ['creator-list'],
    queryFn: async () => {
      const result = await mobius.query({
        // @ts-expect-error too deep
        creators: {
          // @ts-expect-error too deep
          select: { items: { metadata: true, creatorWalletAddress: true } },
        },
      })

      return result?.creators.items as Array<Pick<Creator, "metadata" | "creatorWalletAddress">>
    },
  })
}