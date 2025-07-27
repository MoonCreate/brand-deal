import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { backend } from '@/integrations/hono-api'
import { createBlockExplorerLink, createIPFSGatewayURL } from '@/lib/utils'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'

// TODO: Not FINISH

export type SubmitCampaignDto = Parameters<
  typeof backend.api.campaign.submit.$post
>[0]['form']

export function useSubmitCampaign() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'submit-campaign' })
      },

      onSuccess: (tx) => {
        toast.loading(
          `Transaction hash generated\n${createBlockExplorerLink(tx)}`,
          {
            id: 'submit-campaign',
          },
        )
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['submit-campaign'],
    onMutate: () => {
      toast.loading('Submiting Task...', { id: 'submit-campaign' })
    },

    onSuccess: () => {
      toast.success('Successfully Apply To Campaign', {
        id: 'submit-campaign',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to Submit Campaign Task', { id: 'submit-campaign' })
    },

    mutationFn: async ([id, form]: [id: string, SubmitCampaignDto]) => {
      const metadata = await (
        await backend.api.campaign.submit.$post({ form })
      ).json()

      // @ts-ignore blbablbabla
      if (metadata.error) throw metadata.error

      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'submitTaskCampaignCreator',
        // @ts-expect-error ytttaa
        args: [BigInt(id), createIPFSGatewayURL(metadata.cid)],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
