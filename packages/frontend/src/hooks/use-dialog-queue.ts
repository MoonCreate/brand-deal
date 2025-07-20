import { useRef, useState } from 'react'

export function useDialogQueue() {
  const [, setTimestamp] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const queue = useRef<Array<React.ReactNode>>([])
  const onOpenChange = async (open: boolean) => {
    if (!open) {
      if (queue.current.length === 1) {
        setIsOpen(false)
        const time = new Promise((resolve) => setTimeout(resolve, 0.15 * 1000))
        await time
      }
      queue.current.shift()
    }
    setTimestamp(Date.now())
  }

  const open = (component: React.ReactNode) => {
    if (!isOpen) setIsOpen(true)
    queue.current.unshift(component)
    setTimestamp(Date.now())
  }

  return { open, isOpen, onOpenChange, queue }
}
