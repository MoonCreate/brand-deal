import { useForm } from 'react-hook-form'
import { LucideArrowUp, LucidePlus } from 'lucide-react'
import { motion } from 'motion/react'
import { Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '../buttons/button'
import { DropZone } from '../inputs/dropzone'
import { SplitPopAnimation } from '../text/split-pop-animation'
import { SocialLinkDropdown } from '../dropdown/sociallink-dropdown'
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
  socialLink: Array<{ link: string; type: string }>
  nib: string
}

export function RegisterAsBrandDialog() {
  const dialog = dialogInjection.use()
  const [{ mutate, isPending }] = useRegisterBrand()
  const form = useForm<RegisterBrandDto>()
  const account = useAccount()
  const [socialLength, setSocialLength] = useState(1)
  const navigate = useNavigate()

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        if (!account.address) return
        mutate(
          {
            description: data.description,
            email: data.email,
            image: data.logoBrand,
            name: data.instanceName,
            nib: data.nib,
            socialLinks: JSON.stringify(data.socialLink),
            walletAddress: account.address,
            web: data.web,
          },
          {
            onSuccess: async () => {
              await dialog.close()
              await dialog.close()
              navigate({ to: '/dashboard' })
            },
          },
        )
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
            NIB
            <input {...form.register('nib')} />
          </label>
        </motion.div>
        <motion.div animate={bop}>
          <DropZone onDrop={(file) => form.setValue('logoBrand', file![0])} />
        </motion.div>
      </div>
      <motion.div
        animate={bop}
        className="grid grid-cols-[150px_1fr] gap-6 mt-4 max-h-[200.8px] overflow-auto px-2 -mx-2 relative pb-2"
      >
        <div className="bg-background col-span-2 sticky top-0 -mx-2 px-2 flex pt-2">
          <p>Social Links {socialLength}</p>
          <Button
            onClick={() => setSocialLength((x) => x + 1)}
            type="button"
            className="w-max ml-auto h-max"
          >
            <LucidePlus className="size-4" />
            ADD
          </Button>
        </div>
        {Array.from({ length: socialLength }, (_, i) => (
          <Fragment key={i}>
            <SocialLinkDropdown
              className="h-max"
              onChangeValue={(value) =>
                form.setValue(`socialLink.${i}.type`, value)
              }
            />
            <input
              placeholder="http://...."
              {...form.register(`socialLink.${i}.link`)}
              className="p-2 rounded-xl shadow-md border h-max"
            />
          </Fragment>
        ))}
      </motion.div>
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
