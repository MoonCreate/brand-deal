import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// TODO: Replace with actual API call
export function useRegisterBrand() {
  return useMutation({
    mutationFn: async (dto: unknown) => {
      await new Promise((resolve, reject) =>
        window.setTimeout(() => {
          Math.random() > 0.5 ? resolve('Lucky') : reject('Bad Luck')
        }, 1_000 * 5),
      )
    },

    onMutate: () => {
      toast.loading('Registering brand...', { id: 'register-brand' })
    },
    onSuccess: () => {
      toast.success('Successfully registered brand', {
        id: 'register-brand',
      })
    },

    onError: () => {
      toast.error('Failed to register brand', { id: 'register-brand' })
    },
  })
}
