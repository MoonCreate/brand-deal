import { createFileRoute } from '@tanstack/react-router'
import { CampaignApproval } from '@/features/campaign-approval'

export const Route = createFileRoute('/_no-layout/campaign/approval')({
  component: CampaignApproval,
})
