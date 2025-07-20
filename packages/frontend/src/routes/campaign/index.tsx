import { createFileRoute } from '@tanstack/react-router'
import { CampaignPage } from '@/features/campaign/page'

export const Route = createFileRoute('/campaign/')({
  component: CampaignPage,
})
