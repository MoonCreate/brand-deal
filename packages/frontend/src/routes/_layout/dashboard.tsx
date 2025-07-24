import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAccount } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { DashboardPage } from '@/features/dashboard/page'
import { getProfile } from '@/hooks/use-get-profile'
import { wagmiConfig } from '@/integrations/web3/provider'
import { Profile } from '@/features/profile'

export const Route = createFileRoute('/_layout/dashboard')({
  beforeLoad: async () => {
    const account = getAccount(wagmiConfig)
    if (!account.chain || !account.address) {
      throw redirect({ to: '/' })
    }
    const profile = await getProfile(account.address)
    if (!profile) throw redirect({ to: '/' })
    return { profile }
  },
  loader: (deps) => {
    return deps.context.profile
  },
  component: () => {
    const data = Route.useLoaderData()
    const account = useAccount()

    if (account.address && account.chain)
      return data.type === 'brand' ? (
        <DashboardPage brand={data.result} />
      ) : (
        <Profile profile={data.result} />
      )

    return <div className="flex">PLEASE CONNECT FIRST</div>
  },
})
