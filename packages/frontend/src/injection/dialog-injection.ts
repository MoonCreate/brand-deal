import { useRef } from 'react'
import { useDialogQueue } from '@/hooks/use-dialog-queue'
import { createInjection } from '@/lib/create-inject'

export const dialogInjection = createInjection(function DialogInjection() {
  const queue = useDialogQueue()

  const current = queue.queue.current[0]

  const firstOpen = useRef(true)

  return {
    firstOpen,
    open: ((children) => {
      firstOpen.current = true
      queue.open(children)
    }) satisfies typeof queue.open,
    isOpen: Boolean(current),
    currentContent: current,
    close: () => queue.onOpenChange(false),
  }
})
