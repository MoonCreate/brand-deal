import { useConfig, useWriteContract } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { backend } from '@/integrations/hono-api'
import { createIPFSGatewayURL } from '@/lib/utils'
import { createToastTx } from '@/lib/toast'

type RegisterBrandDto = Parameters<
  typeof backend.api.register.brand.$post
>[0]['form']
export function useRegisterBrand() {
  const config = useConfig()
  const { writeContractAsync, ...restContracts } = useWriteContract({
    mutation: {
      onMutate: () => {
        toast.loading('Calling contract...', { id: 'register-brand' })
      },

      onSuccess: (tx) => {
        createToastTx(tx, 'register-brand')
      },
    },
  })
  const mutation = useMutation({
    mutationKey: ['registerBrand'],
    onMutate: () => {
      toast.loading('Registering brand...', { id: 'register-brand' })
    },

    onSuccess: () => {
      toast.success('Successfully registered brand', {
        id: 'register-brand',
      })
    },

    onError: (error) => {
      console.error(error)
      toast.error('Failed to register brand', { id: 'register-brand' })
    },

    mutationFn: async (dto: RegisterBrandDto) => {
      const metadata = await (
        await backend.api.register.brand.$post({ form: dto })
      ).json()

      // @ts-ignore blbablbabla
      if (metadata.error) throw metadata.error

      const hash = await writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'registerBrand',
        args: [
          dto.name,
          // @ts-expect-error blbablbabla
          createIPFSGatewayURL(metadata.cid),
          BigInt(Number(dto.nib)),
        ],
      })

      return waitForTransactionReceipt(config, { hash })
    },
  })

  return [mutation, restContracts] as const
}
