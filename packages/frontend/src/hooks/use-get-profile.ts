import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useGetProfile() {
  const account = useAccount()
  return useQuery({
    queryKey: ['profile', account.address, account.chain?.name],
    queryFn: () => {
      if (!account.chain) return null 
      return null 
    },
    enabled: Boolean(account.address) && Boolean(account.chain),
  })
}
