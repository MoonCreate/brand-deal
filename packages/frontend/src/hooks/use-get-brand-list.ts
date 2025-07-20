import { useQuery } from '@tanstack/react-query'
import type { Brand } from '@/types'
import { mobius } from '@/integrations/hono-graphql'

// TODO: replace with real data
export function useGetBrandList() {
  return useQuery({
    queryKey: ['brand-list'],
    queryFn: async () => {
      const result = await mobius.query({
        //@ts-expect-error too deep
        brands: {
          // @ts-expect-error too deep
          select: { items: { metadata: true, brandWalletAddress: true } },
        },
      })

      return result?.brands.items as Array<
        Pick<Brand, 'metadata' | 'brandWalletAddress'>
      >
    },
  })
}
