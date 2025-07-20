import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { dialogInjection } from '@/injection/dialog-injection'
import { cn } from '@/lib/utils'

const ignoresDiv = [
  '[data-radix-popper-content-wrapper]',
  '#my-our-dialog-content',
]

export function DialogProvider(props: { children: React.ReactNode }) {
  const provider = dialogInjection.init()

  useLayoutEffect(() => {
    let previousSelector: Array<NodeListOf<Element>> = []
    const clickListener = (ev: PointerEvent) => {
      let isClickDialog = false
      parentLoop: for (const prev of previousSelector) {
        for (const el of prev) {
          isClickDialog = el.contains(ev.target as Node)
          if (isClickDialog) break parentLoop
        }
      }
      previousSelector = ignoresDiv.map((ign) => document.querySelectorAll(ign))
      if (
        !isClickDialog &&
        !provider.firstOpen.current &&
        ev.target !== document.documentElement
      ) {
        provider.close()
      }
      if (provider.firstOpen.current) provider.firstOpen.current = false
    }
    if (provider.isOpen) window.addEventListener('click', clickListener)

    return () => {
      window.removeEventListener('click', clickListener)
    }
  }, [provider.isOpen])

  useEffect(() => {
    const app = document.getElementById('app') as HTMLDivElement

    if (provider.isOpen) {
      app.style.overflow = 'hidden'
      app.style.pointerEvents = 'none'
      document.body.style.overflow = 'hidden'
    } else {
      app.style.pointerEvents = 'unset'
      app.style.overflow = 'unset'
      document.body.style.overflow = 'unset'
    }
  }, [provider.isOpen])

  return (
    <dialogInjection.provider value={provider}>
      {props.children}
      {createPortal(<Dialog />, document.body)}
    </dialogInjection.provider>
  )
}

function Dialog() {
  const ctx = dialogInjection.use()
  return (
    <AnimatePresence>
      {ctx.isOpen && (
        <motion.div
          key="my-our-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/50 fixed inset-0 z-10 m-auto backdrop-blur-xs flex justify-center items-center overflow-auto h-screen"
        >
          <motion.div
            id="my-our-dialog-content"
            initial={{
              ['--translate-before']: '0rem',
              ['--translate-after']: '0rem',
              y: 100,
            }}
            animate={{
              ['--translate-before']: '2.5rem',
              ['--translate-after']: '-2.5rem',
              y: 0,
            }}
            exit={{
              y: -100,
              ['--translate-before']: '0rem',
              ['--translate-after']: '0rem',
            }}
            className={cn(
              'bg-background text-black font-roboto rounded-xl shadow-box relative isolate',
              'before:inset-0 before:bg-primary before:absolute before:-z-1 before:rounded-xl before:translate-(--translate-before)',
              'after:inset-0 after:bg-secondary after:absolute after:-z-1 after:rounded-xl after:translate-(--translate-after)',
              'before:shadow-md after:shadow-md',
            )}
          >
            {ctx.currentContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
