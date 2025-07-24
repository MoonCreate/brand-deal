import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { createBlockExplorerLink } from '@/lib/utils'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'

export function useCancelApply() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'cancely-apply' })
      },

      onSuccess: (tx) => {
        toast.loading(
          `Transaction hash generated\n${createBlockExplorerLink(tx)}`,
          {
            id: 'cancely-apply',
          },
        )
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['cancely-apply'],
    onMutate: () => {
      toast.loading('Cancelling Applier...', { id: 'cancely-apply' })
    },

    onSuccess: () => {
      toast.success('Successfully Cancelling Applier', {
        id: 'cancely-apply',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Cancelling Applier', { id: 'cancely-apply' })
    },

    mutationFn: async (id: string) => {
      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'cancelApply',
        args: [BigInt(id)],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
