import { useConfig, useWriteContract } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { createBlockExplorerLink } from '@/lib/utils'

export function useApplyCampaign() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'register-brand' })
      },

      onSuccess: (tx) => {
        toast.loading(
          `Transaction hash generated\n${createBlockExplorerLink(tx)}`,
          {
            id: 'register-brand',
          },
        )
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['apply-campaign'],
    onMutate: () => {
      toast.loading('Applying to campaign...', { id: 'register-brand' })
    },

    onSuccess: () => {
      toast.success('Successfully Apply To Campaign', {
        id: 'register-brand',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Apply Campaign', { id: 'register-brand' })
    },

    mutationFn: async (id: string) => {
      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'creatorApplyToCampaign',
        args: [BigInt(id)],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
