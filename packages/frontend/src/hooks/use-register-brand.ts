import { useWriteContract } from 'wagmi'
import { brandDealAddress } from '@/integrations/contract'
import { brandDealContractABI } from '@/integrations/contract/abis/brand-deal-abi'
import { backend } from '@/integrations/hono-api'
import { useMutation } from '@tanstack/react-query'

type RegisterBrandDto = Parameters<
  typeof backend.api.register.brand.$post
>[0]['json']
export function useRegisterBrand() {
  const { writeContractAsync, ...restContracts } = useWriteContract()
  const { mutation } = useMutation({
    mutationKey: ['registerBrand'],
    mutationFn: async (dto: RegisterBrandDto) => {
      const metadata = await (
        await backend.api.register.brand.$post({ json: dto })
      ).json()
      writeContractAsync({
        abi: brandDealContractABI,
        address: brandDealAddress,
        functionName: 'registerBrand',
        args: [dto.name, metadata.cid, dto.nib],
      })
    },
  })
}
