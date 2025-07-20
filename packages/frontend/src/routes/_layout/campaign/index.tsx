import { createFileRoute } from '@tanstack/react-router'
import { CampaignPage } from '@/features/campaign/page'

export const Route = createFileRoute('/_layout/campaign/')({
  component: CampaignPage,
})
