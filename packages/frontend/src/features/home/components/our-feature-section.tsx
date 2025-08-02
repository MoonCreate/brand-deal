import { motion } from 'motion/react'
import { LucideBlocks, LucideLock, LucideTriangle } from 'lucide-react'
import { Melt } from './melt'
import { bop } from '@/lib/animation-const'

const features = [
  {
    icon: LucideLock,
    title: 'Secure',
    description:
      'All campaign agreements and payments are locked in smart contracts, ensuring tamper-proof protection for both brands and creators.',
  },
  {
    icon: LucideTriangle,
    title: 'Transparent',
    description:
      'Every step—from application to payment—is visible on-chain, allowing full visibility for brands and creators alike.',
  },
  {
    icon: LucideBlocks,
    title: 'Decentralized',
    description:
      'No central authority controls the platform. Kolabora runs on a trustless system where smart contracts automate and enforce rules.',
  },
]

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
          {features.map((feature, i) => (
            <motion.div
              whileInView={{ ...bop, transitionDelay: i * 100000 }}
              className="flex flex-col self-center h-92 w-70 origin-left"
              key={i}
            >
              <div className="bg-surface-1 pb-2 pt-6 px-6 rounded-b-xl shadow-box grow rounded-tr-xl text-blacked flex flex-col">
                <feature.icon className="size-20" />
                <h2 className="text-4xl font-karantina mt-auto">
                  {feature.title}
                </h2>
                <p className="text-lg">{feature.description}</p>
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
