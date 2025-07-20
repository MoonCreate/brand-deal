import { createFileRoute } from '@tanstack/react-router'
import { CampaignApprove } from '@/features/campaign-approve'

export const Route = createFileRoute('/_no-layout/campaign/approve')({
  component: CampaignApprove,
})
