import { Button } from '@/components/buttons/button'
import { CampaignCard } from '@/components/cards/card'

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
        <div className="grow space-y-2">
          <div className="bg-surface-2 font-karantina text-4xl p-5 rounded-full">
            Keccak Prove <br />
            {props.item.submitMetadataURI}
          </div>
          <Button>Approve</Button>
        </div>
      </div>
    </div>
  )
}
