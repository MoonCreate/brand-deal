import { createFileRoute } from '@tanstack/react-router'
import { NewCampaignPage } from '@/features/new-campaign/page'

export const Route = createFileRoute('/_layout/new-campaign')({
  component: NewCampaignPage,
})
