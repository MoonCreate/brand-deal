import { useForm } from 'react-hook-form'
import { LucideArrowUp } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '../buttons/button'
import { DropZone } from '../inputs/dropzone'
import { SplitPopAnimation } from '../text/split-pop-animation'
import { useRegisterBrand } from '@/hooks/use-register-brand'
import { dialogInjection } from '@/injection/dialog-injection'
import { cn } from '@/lib/utils'
import { bop } from '@/lib/animation-const'

type RegisterBrandDto = {
  instanceName: string
  logoBrand: File
  description: string
  email: string
  web: string
  socialLink: string
  nib: string
}

export function RegisterAsBrandDialog() {
  const dialog = dialogInjection.use()
  const { mutate, isPending } = useRegisterBrand()
  const form = useForm<RegisterBrandDto>()

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        mutate(data, {
          onSuccess: async () => {
            await dialog.close()
            dialog.open('Register Success')
          },
        })
      })}
      className={cn(
        'bg-background text-black font-roboto rounded-xl p-6 shadow-box',
        'flex flex-col gap-2',
      )}
    >
      <div className="">
        <h2 className="text-9xl font-karantina">
          <SplitPopAnimation text="BRAND" />
        </h2>
        <p className="text-xl overflow-y-hidden">
          <SplitPopAnimation text="Create campaigns and connect with talented content creators to promote your brand" />
        </p>
      </div>
      <div className="bg-blacked h-px my-4"></div>
      <div className="flex gap-2">
        <motion.div
          animate={bop}
          className={cn(
            'grow gap-2',
            'flex flex-col',
            '[&>label]:flex',
            '[&>label]:gap-2',
            '[&>label]:justify-between',
            '[&>label>input]:shadow-md',
            '[&>label>input]:border',
            '[&>label>input]:p-2',
            '[&>label>input]:rounded-xl',
            '[&>label>textarea]:shadow-md',
            '[&>label>textarea]:border',
            '[&>label>textarea]:p-2',
            '[&>label>textarea]:rounded-xl',
          )}
        >
          <label>
            Instance Name
            <input {...form.register('instanceName')} />
          </label>
          <label>
            Description
            <textarea {...form.register('description')} />
          </label>
          <label>
            Email
            <input {...form.register('email')} type="email" />
          </label>
          <label>
            Web URL
            <input {...form.register('web')} type="url" />
          </label>
          <label>
            Social Link
            <input {...form.register('socialLink')} type="url" />
          </label>
          <label>
            NIB
            <input {...form.register('nib')} />
          </label>
        </motion.div>
        <motion.div animate={bop}>
          <DropZone onDrop={(file) => form.setValue('logoBrand', file![0])} />
        </motion.div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-primary"></div>
          <div className="size-3 rounded-full bg-secondary"></div>
          <div className="size-3 rounded-full bg-secondary"></div>
        </div>
        <Button
          isLoading={isPending}
          type="submit"
          className="w-max self-end text-xl"
        >
          <LucideArrowUp className="size-4" strokeWidth={4} />
          Register
        </Button>
      </div>
    </form>
  )
}
