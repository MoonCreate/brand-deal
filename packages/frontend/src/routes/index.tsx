import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/home/page'

export const Route = createFileRoute('/')({
  component: HomePage,
})
