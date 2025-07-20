import { DashboardContent } from './content'
import type { Brand } from '@/types'

export function DashboardPage(props: { brand: Brand }) {
  return (
    <main className="w-full h-full flex grow mb-14">
      <DashboardContent brand={props.brand} />
    </main>
  )
}
