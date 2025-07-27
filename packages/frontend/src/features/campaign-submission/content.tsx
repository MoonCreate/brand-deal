import { useLoaderData, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { SubmitCampaignDto } from '@/hooks/use-submit-campaign'
import { Button } from '@/components/buttons/button'
import { CampaignCard, ProfileCard } from '@/components/cards/card'
import { DropZone } from '@/components/inputs/dropzone'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { useSubmitCampaign } from '@/hooks/use-submit-campaign'
import { Textarea } from '@/components/textarea'

export const CampaignSubmissionContent = () => {
  const item = useLoaderData({
    from: '/_no-layout/campaign/submission/$id',
  }) as any
  const [{ mutate, isPending }] = useSubmitCampaign()
  const param = useParams({ from: '/_no-layout/campaign/submission/$id' })
  const form = useForm<SubmitCampaignDto>()

  const onSubmit = (data: SubmitCampaignDto) => {
    mutate([param.id, data])
  }

  return (
    <div className="w-full min-h-full my-10 flex flex-col grow relative">
      <div
        id="campaign-submission-content"
        className="w-full grow flex relative"
      >
        <div className="h-full w-[400px] flex items-center">
          <div className="w-fit mt-14 relative">
            <div
              id="campaign-label"
              className="px-4 w-fit h-14 shadow-pink-300 z-50 absolute -top-6 left-4 -translate-x-1/2 rounded-2xl text-[2.5rem] font-karantina flex items-center justify-center bg-primary text-white shadow-2xl"
            >
              Campaign
            </div>
            <CampaignCard
              buttonChild={<></>}
              data={{
                label: item.status ?? '',
                title: item.metadata?.name,
                description: item.metadata?.description,
                price: item.metadata.attributes[1].value,
                category: 'Technology',
                requirements: item.metadata?.requirements,
                applications: item.creatorPools.items.length + '',
                image: item.metadata?.image,
                logo: item.brand.metadata?.image,
                status: item.status!,
                engagement: item.metadata.engagment,
                deadline: item.metadata?.deadline,
                brandLogo: item.brand.metadata.image,
                brandName: item.brand.metadata.name,
              }}
            />
          </div>
        </div>
        <ProfileCard className="flex-1 rounded-3xl overflow-hidden z-10 relative">
          <div className="font-karantina text-[3rem] text-center text-white bg-primary">
            <SplitPopAnimation text="Campaign" />{' '}
            <SplitPopAnimation text="Submission" />
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="campaign-submission"
            className="w-[calc(100%-2rem)] h-[calc(100%-7.5rem)] bg-primary font-roboto flex flex-col gap-2 p-5 text-white"
          >
            <DropZone
              wrapperClassName="bg-primary rounded-3xl w-full"
              onDrop={(e) => {
                form.setValue('image', e![0])
              }}
            />
            <label>
              <Textarea
                className="min-h-50 bg-surface-1 text-foreground font-karantina !text-5xl"
                placeholder="Write your description"
                {...form.register('description')}
              />
            </label>
          </form>
          <div className="w-full h-12 bottom-0 left-0 bg-black/20 z-40 absolute shadow-2xl"></div>
          <div className="w-10 h-full bottom-0  bg-secondary z-40 absolute right-0 shadow-2xl "></div>
          <Button
            isLoading={isPending}
            type="submit"
            form="campaign-submission"
            className="absolute bottom-0 right-0 z-40 h-12 w-20 flex justify-center shadow-2xl shadow-black"
          >
            Submit
          </Button>
        </ProfileCard>
      </div>
    </div>
  )
}
