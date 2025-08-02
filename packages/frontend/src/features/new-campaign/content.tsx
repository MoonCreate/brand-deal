import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowRightBottom } from '../../../assets/arrow-right-bottom'
import { Input } from '../../components/inputs/index'
import { Textarea } from '../../components/textarea'
import type { CreateCampaignDto } from '@/hooks/use-create-campaign'
import { useCreateCampaign } from '@/hooks/use-create-campaign'
import { ProfileCard } from '@/components/cards/card'
import { Button } from '@/components/buttons/button'
import { DropZone } from '@/components/inputs/dropzone'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { bop } from '@/lib/animation-const'
import { useGetProfile } from '@/hooks/use-get-profile'

export const NewCampaignContent = () => {
  const profile = useGetProfile()
  const [{ isPending, mutate }] = useCreateCampaign()
  const form = useForm<CreateCampaignDto>({
    defaultValues: {
      brandName: profile.data?.result.name,
    },
  })

  return (
    <div className="w-full min-h-full my-10 flex flex-col grow relative">
      <div className="font-karantina text-7xl ">
        <SplitPopAnimation text="Create" />{' '}
        <SplitPopAnimation text="Campaign" />
      </div>

      <form
        onSubmit={form.handleSubmit((data) => {
          if (profile.data?.type !== 'brand')
            return toast.error('You are not a brand')
          if (+data.deadline <= 0)
            return toast.error("Deadline can't be in the past")
          mutate(data)
        })}
        className="flex grow gap-14"
      >
        <ProfileCard
          className="mt-10 w-1/2 h-full flex-col relative"
          position="top-right"
        >
          <div className="-40 h-40 absolute bg-green-100 z-20"></div>
          <div className="p-6 flex flex-col gap-4">
            <div id="title" className="">
              <div className="text-[40px]">Title</div>
              <Input
                className="bg-white shadow-md !text-3xl"
                {...form.register('name')}
              />
            </div>
            <div id="description" className="">
              <div className="text-[40px]">Description</div>
              <Textarea
                className="bg-white h-30 shadow-md !text-3xl"
                {...form.register('description')}
              />
              <div id="description" className="">
                <div className="text-[40px]">Reward</div>
                <Input
                  type="number"
                  className="bg-white shadow-md !text-3xl"
                  {...form.register('valueStaked')}
                />
              </div>
            </div>
            <div id="title" className="">
              <div className="text-[40px]">Deadline</div>
              <Input
                className="bg-white shadow-md !text-3xl"
                type="datetime-local"
                onChange={(e) => {
                  const date = new Date(e.target.value)
                  const now = Date.now()
                  const time = (date.getTime() - now) / 1_000
                  form.setValue('deadline', time + '')
                }}
              />
            </div>
          </div>
          <div
            className="rounded-full w-7 h-7 bg-white bottom-2 right-2 absolute"
            style={{ boxShadow: 'inset 2px 5px 0px rgba(0, 0, 0, 0.4)' }}
          />
        </ProfileCard>
        <div className="flex-1 h-full mt-10 relative">
          <motion.div
            animate={{
              y: ['100%', '0%'],
              rotate: [210, 0],
              keyTimes: 2000,
            }}
            className="absolute right-5 rotate-32 bottom-1 w-50 h-50"
          >
            <img src={ArrowRightBottom} />
          </motion.div>

          <ProfileCard
            className="w-4/5 h-[calc(100%-7rem)] flex flex-col justify"
            position="bottom-right"
          >
            <div
              className="rounded-full w-7 h-7 bg-white top-4 left-4 absolute z-50"
              style={{ boxShadow: 'inset 2px 5px 0px rgba(0, 0, 0, 0.4)' }}
            />
            <div className="w-full h-full">
              <DropZone
                onDrop={(files) => form.setValue('image', files![0])}
                wrapperClassName="w-full h-full"
              />
            </div>
          </ProfileCard>
          <motion.div
            animate={bop}
            className="mx-auto absolute bottom-5 text-[2rem] text-center flex justify-center h-12 bg-green-100 w-fit right-50"
          >
            <Button type="submit" isLoading={isPending}>
              Create <Plus className="font-bold size-7" strokeWidth={3} />
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  )
}
