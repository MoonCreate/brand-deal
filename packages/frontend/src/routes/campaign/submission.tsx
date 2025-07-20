import { createFileRoute } from '@tanstack/react-router'
import { CampaignSubmission } from '@/features/campaign-submission'

export const Route = createFileRoute('/campaign/submission')({
  component: CampaignSubmission,
})
