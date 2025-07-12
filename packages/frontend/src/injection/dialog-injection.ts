import { useDialogQueue } from '@/hooks/use-dialog-queue'
import { createInjection } from '@/lib/create-inject'

export const dialogInjection = createInjection(function DialogInjection() {
  const queue = useDialogQueue()

  const current = queue.queue.current[0]

  return {
    open: queue.open,
    isOpen: Boolean(current),
    currentContent: current,
    close: () => queue.onOpenChange(false),
  }
})
