import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import type { Address } from 'viem'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { createToastTx } from '@/lib/toast'

export function useApproveCampaignCreator() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'approve-campaign' })
      },

      onSuccess: (tx) => {
        createToastTx(tx, 'approve-campaign')
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['apply-campaign'],
    onMutate: () => {
      toast.loading('Assigning Creator...', { id: 'approve-campaign' })
    },

    onSuccess: () => {
      toast.success('Successfully Apply To Campaign', {
        id: 'approve-campaign',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Assign Creator', { id: 'approve-campaign' })
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
