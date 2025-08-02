import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { getAccount } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
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
    const router = useRouter()
    const data = Route.useLoaderData()
    const account = useAccount()

    useEffect(() => {
      if (
        !account.isConnected &&
        !account.isReconnecting &&
        !account.isConnecting
      )
        router.invalidate({
          filter: (r) => r.fullPath == '/dashboard',
          sync: true,
        })
    }, [account])

    if (account.address && account.chain)
      return data.type === 'brand' ? (
        <DashboardPage brand={data.result} />
      ) : (
        <Profile profile={data.result} />
      )

    return <div className="flex">PLEASE CONNECT FIRST</div>
  },
})
