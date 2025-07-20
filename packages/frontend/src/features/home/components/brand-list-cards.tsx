import { useState } from 'react'
import { motion } from 'motion/react'
import { LucideTrendingUp } from 'lucide-react'
import { useGetBrandList } from '@/hooks/use-get-brand-list'
import { bop } from '@/lib/animation-const'
import { cn, formatNumber } from '@/lib/utils'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'

export function BrandListCards() {
  const { data: brands, isLoading } = useGetBrandList()
  const [brandIndex, setBrandIndex] = useState(0)
  return (
    <motion.div
      onTap={() => {
        if (!brands) return
        setBrandIndex((prev) => (prev + 1) % brands.length)
      }}
      animate={bop}
    >
      <motion.div
        initial={{
          ['--translate-before']: '2.5rem',
          ['--translate-after']: '-2.5rem',
        }}
        whileTap={{
          scale: 0.8,
          rotate: 50,
          ['--translate-before']: '0rem',
          ['--translate-after']: '0rem',
        }}
        className={cn(
          'relative isolate',
          'before:-z-1 before:absolute before:inset-0 before:bg-primary before:rounded-xl',
          'after:-z-1 after:absolute after:inset-0 after:bg-secondary after:rounded-xl',
          'after:translate-(--translate-after)',
          'before:translate-(--translate-before)',
          'before:shadow-md after:shadow-md',
          'self-start mt-30',
          'origin-left',
        )}
      >
        <div className="bg-surface-1 rounded-xl shadow-box p-6">
          <div
            className={cn(
              'bg-surface-2 rounded-xl h-[182px] w-full overflow-hidden',
              isLoading ? 'animate-pulse' : '',
            )}
          >
            <img
              className="object-cover h-full w-[326.54px] rounded-xl"
              src={brands?.[brandIndex].metadata.image}
              alt={brands?.[brandIndex].metadata.name}
            />
          </div>
          <h2
            className={cn(
              'font-karantina text-5xl mt-5',
              'min-h-[48px] overflow-y-hidden',
              isLoading && 'animate-pulse bg-surface-2 rounded-xl',
            )}
          >
            <SplitPopAnimation text={brands?.[brandIndex].metadata.name} />
          </h2>
          <p>{!isLoading && 'Brand'}</p>
          {!isLoading && (
            <div className="flex gap-2 items-center text-primary font-semibold text-lg">
              <LucideTrendingUp strokeWidth={3} className="size-4" />{' '}
              <span>
                <SplitPopAnimation
                  text={formatNumber(((Math.random() * 1_000) | 0) + 1_000)}
                />
              </span>
              <div className="ml-auto flex gap-2">
                <div className="size-3 rounded-full bg-primary"></div>
                <div className="size-3 rounded-full bg-secondary"></div>
                <div className="size-3 rounded-full bg-secondary"></div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
