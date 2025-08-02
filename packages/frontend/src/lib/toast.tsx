import toast from 'react-hot-toast'
import { LucideLink } from 'lucide-react'
import { createBlockExplorerLink } from './utils'
import type { Toast } from 'react-hot-toast'
import type { Address } from 'viem'
import { getButtonStyle } from '@/components/buttons/button'

export function createToastTx(hash: Address, id: string) {
  toast.loading((t) => <TxToast hash={hash} t={t} />, { id })
}

function TxToast({ hash, t }: { hash: Address; t: Toast }) {
  const link = createBlockExplorerLink(hash)
  return (
    <div className="flex gap-2 items-center">
      {t.icon}
      Transaction hash generated
      <a href={link} target="_blank" className={getButtonStyle('default')}>
        <LucideLink className="size-3" />
        See
      </a>
    </div>
  )
}
