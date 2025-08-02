import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { bop } from '@/lib/animation-const'

const headlines = [
  'Campaign',
  'On chain',
  'Decentralized',
  'Low cost',
  'Open source',
]

export function TitleHeadline() {
  const [headlineIndex, setHeadlineIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length)
    }, 1_000 * 2)

    return () => window.clearInterval(interval)
  }, [headlines])
  return (
    <motion.div animate={bop} className="origin-left">
      <h2 className="text-9xl font-karantina">KOLABORA</h2>
      <h3 className="text-2xl overflow-x-hidden">
        <SplitPopAnimation text={headlines[headlineIndex]} />
      </h3>
    </motion.div>
  )
}
