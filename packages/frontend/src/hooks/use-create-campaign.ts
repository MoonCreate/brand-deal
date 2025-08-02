import { useConfig, useWriteContract } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import {
  brandDealAddress,
  campaignAddress,
  usdcAddress,
} from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { backend } from '@/integrations/hono-api'
import { createIPFSGatewayURL } from '@/lib/utils'
import { erc20Abi } from 'viem'
import { createToastTx } from '@/lib/toast'

export type CreateCampaignDto = {
  name: string
  image: File
  description: string
  brandName: string
  deadline: string
  valueStaked: string
}

export function useCreateCampaign() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'create-campaign' })
      },

      onSuccess: (tx) => {
        createToastTx(tx, 'create-campaign')
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['createCampaign'],
    onMutate: () => {
      toast.loading('Creating Campaign...', { id: 'create-campaign' })
    },

    onSuccess: () => {
      toast.success('Successfully creating campaign', {
        id: 'create-campaign',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to creating campaign', { id: 'create-campaign' })
    },

    mutationFn: async (dto: CreateCampaignDto) => {
      const metadata = await (
        await backend.api.campaign.create.$post({
          form: {
            ...dto,
            deadline: new Date(
              +dto.deadline * 1_000 + Date.now(),
            ).toISOString(),
          },
        })
      ).json()

      // @ts-ignore blbablbabla
      if (metadata.error) throw metadata.error
      const amount = BigInt((+dto.valueStaked * 10 ** 6) | 0)

      const approveHash = await writeContractAsync({
        abi: erc20Abi,
        address: usdcAddress,
        functionName: 'approve',
        args: [campaignAddress, amount],
      })

      await waitForTransactionReceipt(config, { hash: approveHash })

      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'createCampaign',
        args: [
          dto.name,
          amount,
          BigInt(+dto.deadline | 0),
          // @ts-expect-error ytttaa
          createIPFSGatewayURL(metadata.cid),
        ],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
