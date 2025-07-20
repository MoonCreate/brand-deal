import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import type { Brand, Creator } from '@/types'
import type { Address } from 'viem'
import { mobius } from '@/integrations/hono-graphql'

export async function getProfile(address: Address) {
  const result = await mobius.query({
    // @ts-expect-error too deep
    creator: {
      where: { creatorWalletAddress: address },
      select: { metadata: true, creatorWalletAddress: true },
    },
    brand: {
      where: { brandWalletAddress: address },
      select: { metadata: true, brandWalletAddress: true },
    },
  })
  if (result?.brand)
    return {
      type: 'brand' as const,
      result: result.brand as Brand,
    }
  if (result?.creator)
    return {
      type: 'creator' as const,
      result: result.creator as Creator,
    }
  return null
}

export function useGetProfile() {
  const account = useAccount()
  return useQuery({
    queryKey: ['profile', account.address, account.chain?.name],
    queryFn: async () => {
      return getProfile(account.address as Address);
    },
    enabled: Boolean(account.address) && Boolean(account.chain),
  })
}
