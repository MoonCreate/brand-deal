import { useConnectModal, useProfileModal, useChainModal } from '@xellar/kit'
import {
  useAccount,
  useChainId,
  useChains,
  useDisconnect,
  type Config,
  type UseAccountReturnType,
} from 'wagmi'
import { LucideLink, LucideUser, LucideWallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { useMemo } from 'react'

export function ConnectButton() {
  const account = useAccount()
  return account.isConnected ? (
    <LogoutWallet account={account} />
  ) : (
    <ConnectWallet />
  )
}

function ConnectWallet() {
  const { open } = useConnectModal()
  return (
    <button
      onClick={open}
      className={cn(
        'bg-primary font-bold font-roboto text-background',
        'rounded-md pl-2 pr-10 py-1 shadow-box',
        'relative isolate before:h-8 before:w-7 before:absolute before:bg-secondary before:right-1 before:top-0',
        'before:-translate-y-[20%] before:rounded-md before:shadow-md before:rotate-6',
        'after:h-8 after:w-7 after:absolute after:bg-danger after:right-0 after:top-0',
        'after:-translate-y-[0%] after:rounded-md after:shadow-md after:rotate-30',
        'hover:bg-primary/70 hover:cursor-pointer active:scale-95 transition-transform ease-out',
        'active:after:scale-80 active:before:scale-80 after:ease-out before:ease-out before:transition-transform after:transition-transform',
        'flex items-center gap-2',
      )}
    >
      <LucideWallet className="size-4 font-bold" />
      Connect Wallet
    </button>
  )
}

function LogoutWallet(props: { account: UseAccountReturnType<Config> }) {
  const chainModal = useChainModal()
  const profileModal = useProfileModal()
  const chainId = useChainId()
  const chains = useChains()

  const chain = useMemo(() => chains.find((x) => x.id == chainId), [chainId])

  return (
    <div className="flex gap-2">
      <Button className={chain ? '' : 'bg-danger'} onClick={chainModal.open}>
        <LucideLink className="size-4" />
        {chain?.name || 'Wrong Network'}
      </Button>
      <Button onClick={profileModal.open}>
        <LucideUser className="size-4" />
        {props.account.address?.slice(0, 6)}...
        {props.account.address?.slice(-4)}
      </Button>
    </div>
  )
}
