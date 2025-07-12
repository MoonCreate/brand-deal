import { motion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        'p-6 rounded-xl shadow-box relative isolate bg-surface-1',
        'before:inset-0 before:absolute before:bg-primary before:h-1/4 before:-z-1 before:rounded-t-xl',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
