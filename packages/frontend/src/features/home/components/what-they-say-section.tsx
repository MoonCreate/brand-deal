import { LucideStar } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

const reviews = [
  {
    name: 'Alya Pratama',
    content:
      'Kolabora makes it super easy to find brand deals. The whole process feels safe and professional.',
    stars: 5,
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Rizky Saputra',
    content:
      'I love how transparent everything is. I can track my campaign status and payments without guessing.',
    stars: 4,
    image: 'https://i.pravatar.cc/150?img=33',
  },
  {
    name: 'Nadine Kusuma',
    content:
      'As a brand, we’ve saved so much time managing campaigns. The smart contract integration is a game-changer.',
    stars: 5,
    image: 'https://i.pravatar.cc/150?img=25',
  },
  {
    name: 'Dewa Mahardika',
    content:
      'Decentralized and fair. No more chasing payments—everything is handled automatically.',
    stars: 4,
    image: 'https://i.pravatar.cc/150?img=12',
  },
]

export function WhatTheySaySection() {
  return (
    <div className="h-screen flex flex-col py-5">
      <h2 className="text-9xl font-karantina text-black self-center">
        WHATS THEY SAY ABOUT US
      </h2>
      <div className="flex gap-10 m-auto">
        {reviews.map(function Map(review, i) {
          const unstared = useMemo(() => {
            const u = 5 - review.stars
            const components = []
            for (let ii = 0; ii < u; ii++)
              components.push(
                <LucideStar className="text-primary" strokeWidth={3} />,
              )
            return components
          }, [review.stars])
          return (
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
                <img
                  className="bg-surface-2 rounded-full mx-auto aspect-square w-full"
                  src={review.image}
                />
                <h2 className="text-4xl font-karantina mt-auto">
                  {review.name}
                </h2>
                <p className="text-lg">{review.content}</p>
                <div className="ml-auto flex gap-2 mt-6">
                  {Array.from({ length: review.stars }).map((_, ii) => (
                    <LucideStar
                      key={ii}
                      className="text-primary fill-primary"
                      strokeWidth={3}
                    />
                  ))}
                  {unstared}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
