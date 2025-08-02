import { useConfig, useWriteContract } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { backend } from '@/integrations/hono-api'
import { createIPFSGatewayURL } from '@/lib/utils'
import { createToastTx } from '@/lib/toast'

type RegistercreatorDto = Parameters<
  typeof backend.api.register.creator.$post
>[0]['form']
export function useRegistercreator() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'register-creator' })
      },

      onSuccess: (tx) => {
        createToastTx(tx, 'register-creator')
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['registerCreator'],
    onMutate: () => {
      toast.loading('Registering creator...', { id: 'register-creator' })
    },

    onSuccess: () => {
      toast.success('Successfully registered creator', {
        id: 'register-creator',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to register creator', { id: 'register-creator' })
    },

    mutationFn: async (dto: RegistercreatorDto) => {
      const metadata = await (
        await backend.api.register.creator.$post({ form: dto })
      ).json()

      // @ts-ignore blbablbabla
      if (metadata.error) throw metadata.error

      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'registerCreator',
        // @ts-expect-error hahah
        args: [dto.name, createIPFSGatewayURL(metadata.cid)],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
