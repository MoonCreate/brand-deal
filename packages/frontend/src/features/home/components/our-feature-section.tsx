import { motion } from 'motion/react'
import { Melt } from './melt'
import { bop } from '@/lib/animation-const'

export function OurFeatureSection() {
  return (
    <div className="min-h-screen flex py-10 -mx-30">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        className="bg-blacked grow rounded-xl relative p-5 flex flex-col isolate"
      >
        <h2 className="text-9xl font-karantina text-white self-end">
          WHATS OUR FEATURE
        </h2>
        <div className="flex gap-10 mx-auto my-auto">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              whileInView={{...bop, transitionDelay: i * 100000}}
              className="flex flex-col self-center h-92 w-70 origin-left"
              key={i}
            >
              <div className="bg-surface-1 pb-2 pt-6 px-6 rounded-b-xl shadow-box grow rounded-tr-xl text-blacked flex flex-col">
                <div className="bg-surface-2 h-40 rounded-md"></div>
                <h2 className="text-4xl font-karantina mt-auto">Lorem Ipsum</h2>
                <p className="text-lg">Lorem Ipsum Dolor Sit Amet,</p>
                <div className="ml-auto flex gap-2 mt-6">
                  <div className="size-3 rounded-full bg-blacked"></div>
                  <div className="size-3 rounded-full bg-blacked"></div>
                  <div className="size-3 rounded-full bg-blacked"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="ml-auto flex gap-3 mt-6 mx-auto">
          <div className="size-3 rounded-full bg-white"></div>
          <div className="size-3 rounded-full bg-white"></div>
          <div className="size-3 rounded-full bg-white"></div>
        </div>
        <Melt />
      </motion.div>
    </div>
  )
}
