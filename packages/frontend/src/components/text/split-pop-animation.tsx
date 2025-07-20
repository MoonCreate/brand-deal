import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function SplitPopAnimation(props: { text: string | undefined }) {
  return (
    <AnimatePresence>
      {props.text !== undefined
        ? props.text.split('').map((_, index) => (
            <motion.span
              className={cn('inline-block', _ === ' ' && 'w-2')}
              key={index + _ + props.text}
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.01 }}
            >
              {_}
            </motion.span>
          ))
        : null}
    </AnimatePresence>
  )
}
