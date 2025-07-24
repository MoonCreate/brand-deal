import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import type { Address } from 'viem'
import { createBlockExplorerLink } from '@/lib/utils'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'

export function useApproveCampaignCreator() {
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
      toast.loading('Assigning Creator...', { id: 'register-brand' })
    },

    onSuccess: () => {
      toast.success('Successfully Apply To Campaign', {
        id: 'register-brand',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Assign Creator', { id: 'register-brand' })
    },

    mutationFn: async ([id, addr]: [id: string, addres: Address]) => {
      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'assignCreatorToCampaign',
        args: [BigInt(id), addr],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
