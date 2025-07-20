import { LucideHeart } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'motion/react'
import { bop } from '@/lib/animation-const'
import { cn } from '@/lib/utils'
import { useGetCreatorList } from '@/hooks/use-get-creator-list'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'

export function CreatorListCard() {
  const { data: creators, isLoading } = useGetCreatorList()
  const [creatorIndex, setCreatorIndex] = useState(0)
  const creator = creators?.[creatorIndex]

  return (
    !isLoading && (
      <motion.div
        onClick={() => setCreatorIndex((prev) => (prev + 1) % creators!.length)}
        animate={bop}
      >
        <motion.div
          initial={{
            ['--translate-before']: '3.75rem',
            ['--translate-after']: '-1.5rem',
          }}
          whileTap={{
            scale: 0.8,
            rotate: -50,
            ['--translate-before']: '0rem',
            ['--translate-after']: '0rem',
          }}
          className={cn(
            'relative isolate',
            'before:-z-1 before:absolute before:inset-0 before:bg-secondary before:rounded-xl',
            'after:-z-1 after:absolute after:inset-0 after:bg-primary after:rounded-xl',
            'after:translate-(--translate-after)',
            'before:translate-(--translate-before)',
            'before:shadow-md after:shadow-md after:size-8/12',
            'mt-15',
            'origin-right',
          )}
        >
          <div>
            <div className="bg-surface-1 w-[calc(100%-5rem)] shadow-box h-10 -mb-px rounded-t-xl"></div>
            <div className="bg-surface-1 rounded-x-xl rounded-b-xl rounded-tr-xl shadow-box p-6">
              <div className="bg-surface-2 rounded-xl h-[324px] w-[479px]">
                <img
                  src={creator?.image}
                  alt={creator?.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h2 className="font-karantina text-5xl mt-5 overflow-y-hidden">
                <SplitPopAnimation text={creator?.name} />
              </h2>
              <p className="">Creator</p>
              <div className="flex gap-2 items-center text-primary font-semibold text-lg">
                <LucideHeart strokeWidth={3} className="size-4" />{' '}
                <span>
                  <SplitPopAnimation text={creator?.followers} />
                </span>
                <div className="ml-auto flex gap-2">
                  <div className="size-3 rounded-full bg-primary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  )
}
