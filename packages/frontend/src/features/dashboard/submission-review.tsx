import { useQuery } from '@tanstack/react-query'
import { LucideLoader2 } from 'lucide-react'
import { Button } from '@/components/buttons/button'
import { CampaignCard } from '@/components/cards/card'
import { mobius } from '@/integrations/hono-graphql'
import { useResolveCampaign } from '@/hooks/use-resolve-campaign'

export function SubmissionReview(props: {
  item: {
    id: `${number}`
    label: string
    title: any
    description: any
    price: `${number}`
    category: string
    requirements: any
    applications: string
    image: any
    logo: any
    status:
      | 'Pending'
      | 'OpenForApplication'
      | 'Assigned'
      | 'UnderReview'
      | 'Approved'
      | 'Disputed'
      | 'TimedOut'
      | 'CompletedAndPaid'
    engagement: any
    deadline: any
    brandLogo: any
    brandName: any
    submitMetadataURI: string | null
  }
}) {
  const [{ mutate, isPending }] = useResolveCampaign()
  const { data, isLoading } = useQuery({
    queryKey: [
      'submission-metadata',
      props.item.submitMetadataURI,
      props.item.id,
    ],
    queryFn: async () => {
      const response = await fetch(props.item.submitMetadataURI!)
      const submitMetadata = (await response.json()) as {
        description: string
        image: string
      }

      const creatorMetadata = await mobius.query({
        campaign: {
          where: { campaignNFTId: props.item.id },
          select: {
            // @ts-ignore ignore deep
            creator: {
              metadata: true,
            },
          },
        },
      })
      return {
        submitMetadata,
        creatorMetadata: creatorMetadata?.campaign.creator.metadata,
      }
    },
  })
  return (
    <div className="bg-surface-1 rounded-lg p-4 space-y-2">
      <h2 className="text-9xl font-karantina">Review Submission</h2>
      <div className="h-px bg-black rounded-full"></div>
      <div className="flex gap-2">
        <CampaignCard
          className="max-w-[300px]"
          data={props.item as any}
          buttonChild={<></>}
        />

        {isLoading ? (
          <div className="grow min-w-[500px] flex justify-center items-center">
            <LucideLoader2 className="animate-spin size-30 text-black/20" />
          </div>
        ) : (
          <div className="grow space-y-5 flex flex-col">
            <div className="relative isolate border-2 rounded-4xl">
              <img
                src={data?.submitMetadata.image}
                className="w-[500px] h-auto aspect-video rounded-4xl shadow-neomorphism shadow-md object-cover"
              />
            </div>
            <div className="grow relative isolate">
              <div className="bg-danger -z-1 rounded-4xl absolute inset-0 rotate-2 shadow-md"></div>
              <div className="bg-secondary rounded-4xl shadow-md p-5 h-full flex gap-5">
                <div className="flex flex-col">
                  <img
                    src={data?.creatorMetadata.image}
                    className="size-20 rounded-full bg-surface-1 shadow-md border"
                  />
                  <div className="text-xs mt-2 font-bold font-roboto text-black/40">
                    {data?.creatorMetadata.name}
                  </div>
                </div>
                <div className="flex flex-col grow">
                  <div className="font-karantina text-2xl">
                    "{data?.submitMetadata.description}"
                  </div>
                  <div className=" flex gap-2 mt-auto ml-auto">
                    <div className="size-2 rounded-full bg-blacked"></div>
                    <div className="size-2 rounded-full bg-blacked"></div>
                    <div className="size-2 rounded-full bg-blacked"></div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              isLoading={isPending}
              onClick={() => mutate(props.item.id)}
              className="w-max ml-auto"
            >
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
