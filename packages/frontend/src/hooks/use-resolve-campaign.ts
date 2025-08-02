import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { createToastTx } from '@/lib/toast'

export function useResolveCampaign() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'resolve-campaign' })
      },

      onSuccess: (tx) => {
        createToastTx(tx, 'resolve-campaign')
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['resolve-campaign'],
    onMutate: () => {
      toast.loading('Resolving Campaign...', { id: 'resolve-campaign' })
    },

    onSuccess: () => {
      toast.success('Successfully Resolving Campaign', {
        id: 'resolve-campaign',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Resolving Campaign', { id: 'resolve-campaign' })
    },

    mutationFn: async (id: string) => {
      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'resolveCampaign',
        args: [BigInt(id)],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
