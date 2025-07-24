import { LucideArrowUp, LucidePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import { Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import { useNavigate } from '@tanstack/react-router'
import { DropZone } from '../inputs/dropzone'
import { Button } from '../buttons/button'
import { SplitPopAnimation } from '../text/split-pop-animation'
import { SocialLinkDropdown } from '../dropdown/sociallink-dropdown'
import { dialogInjection } from '@/injection/dialog-injection'
import { cn } from '@/lib/utils'
import { bop } from '@/lib/animation-const'
import { useRegistercreator } from '@/hooks/use-register-creator'

type RegisterCreatorDto = {
  publicName: string
  photoProfile: File
  description: string
  email: string
  locationAddress: string
  socialLink: Array<{
    type: string
    link: string
  }>
  walletAddress: string
}

export function RegisterAsContentCreatorDialog() {
  const dialog = dialogInjection.use()
  const [{ mutate, isPending }] = useRegistercreator()
  const form = useForm<RegisterCreatorDto>()
  const [socialLength, setSocialLength] = useState(1)
  const account = useAccount()
  const navigate = useNavigate()

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        if (!account.address) return
        mutate(
          {
            name: data.publicName,
            description: data.description,
            email: data.email,
            image: data.photoProfile,
            locationAddress: data.locationAddress,
            socialLinks: JSON.stringify(data.socialLink),
            walletAddress: account.address,
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
        <h2 className="text-9xl font-karantina overflow-y-hidden">
          <SplitPopAnimation text="CREATOR" />
        </h2>
        <p className="text-xl overflow-y-hidden">
          <SplitPopAnimation text="Join our platform and start sharing your creative work with the world" />
        </p>
      </div>
      <div className="bg-blacked h-px my-4"></div>
      <div className="flex gap-2">
        <motion.div
          animate={bop}
          className={cn(
            'gap-2',
            'flex flex-col',
            '[&>label]:flex',
            '[&>label]:gap-2',
            '[&>label]:justify-between',
            '[&>label>input]:shadow-md',
            '[&>label>input]:border',
            '[&>label>input]:w-[300px]',
            '[&>label>textarea]:w-[300px]',
            '[&>label>input]:p-2',
            '[&>label>input]:rounded-xl',
            '[&>label>textarea]:shadow-md',
            '[&>label>textarea]:border',
            '[&>label>textarea]:p-2',
            '[&>label>textarea]:rounded-xl',
            'origin-left grow',
          )}
        >
          <label>
            Name
            <input
              placeholder="What should we call you"
              {...form.register('publicName')}
            />
          </label>
          <label>
            Description
            <textarea
              placeholder="Describe yourself"
              {...form.register('description')}
            />
          </label>
          <label>
            Location Address
            <textarea
              placeholder="Location Address"
              {...form.register('locationAddress')}
            />
          </label>
          <label>
            Email
            <input
              {...form.register('email')}
              placeholder="me@me.com"
              type="email"
            />
          </label>
        </motion.div>
        <motion.div className="origin-right ml-auto" animate={bop}>
          <DropZone
            wrapperClassName="aspect-square size-50"
            onDrop={(file) => form.setValue('photoProfile', file![0])}
          />
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
