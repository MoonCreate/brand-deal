import { createFileRoute } from '@tanstack/react-router'
import { CampaignSubmission } from '@/features/campaign-submission'

export const Route = createFileRoute('/_no-layout/campaign/submission')({
  component: CampaignSubmission,
})
