import { LucideStar } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function WhatTheySaySection() {
  return (
    <div className="h-screen flex flex-col py-5">
      <h2 className="text-9xl font-karantina text-black self-center">
        WHATS THEY SAY ABOUT US
      </h2>
      <div className="flex gap-10 m-auto">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            whileInView={{ y: ['100%', '0%'] }}
            className="flex flex-col self-center h-92 w-50"
            key={i}
          >
            <div
              className={cn(
                'bg-surface-1 pb-2 pt-6 px-6 rounded-b-xl shadow-box grow rounded-tr-xl text-blacked flex flex-col relative',
                'before:absolute isolate before:inset-0 before:h-1/4 before:bg-primary before:-z-1 before:rounded-t-xl',
              )}
            >
              <div className="bg-surface-2 rounded-full mx-auto aspect-square w-full"></div>
              <h2 className="text-4xl font-karantina mt-auto">Lorem Ipsum</h2>
              <p className="text-lg">Lorem Ipsum Dolor Sit Amet,</p>
              <div className="ml-auto flex gap-2 mt-6">
                <LucideStar
                  className="text-primary fill-primary"
                  strokeWidth={3}
                />
                <LucideStar
                  className="text-primary fill-primary"
                  strokeWidth={3}
                />
                <LucideStar
                  className="text-primary fill-primary"
                  strokeWidth={3}
                />
                <LucideStar className="text-primary" strokeWidth={3} />
                <LucideStar className="text-primary" strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
