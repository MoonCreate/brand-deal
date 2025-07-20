import { CalendarDaysIcon, DollarSign, Eye, Users } from 'lucide-react'

import { motion } from 'motion/react'
import CameraCampaign from '../../../assets/camera-campaign-card.png'

import { Button } from '../buttons/button'
import type { HTMLMotionProps } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'
import { cn } from '@/lib/utils'
import { flipCard } from '@/lib/animation-const'

export type CampaignCardData = {
  label: string
  title: string
  description: string
  price: string
  category: string
  requirements: string
  engagement: string
  applications: string
  image: string
  logo: string
  status: string
  deadline: string
}

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

export function CampaignCard({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'> & { data: CampaignCardData }) {
  return (
    <motion.div
      animate={flipCard}
      whileHover={{ scale: 1.05 }}
      className={cn('w-full h-[450px]  rounded-4xl relative border', className)}
      id="campaign-card"
      {...props}
    >
      <img
        src={props.data.image}
        className="rounded-4xl w-full h-full border-2 border-muted-foreground/40"
      />
      <div
        id="label"
        className="min-w-28 h-8  absolute right-0 top-9 flex items-center px-4 rounded-l-2xl gap-2 bg-blue-100 shadow-xl shadow-muted-foreground/40"
      >
        ● <span className="text-sm font-bold">{props.data.label}</span>
      </div>

      <div
        id="content"
        className="absolute bottom-2 w-[95%] h-[200px] rounded-4xl left-2"
      >
        <div className="w-full h-full bg-green-50 rounded-4xl p-2 flex gap-4">
          {/* LEFT CONTENT  */}
          <div className="w-[92px] h-4/5  rounded-l-4xl  mt-8">
            <div className="font-bold text-muted-foreground text-lg ml-1">
              Chimera
            </div>

            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale absolute">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div className="bg-muted-foreground text-white text-[10px] h-fit z-10 px-2 rounded-md -bottom-2 absolute -right-2 shadow-lg shadow-pink-200">
                {props.data.applications}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT  */}
          <div
            id="child-content"
            className="w-full rounded-r-4xl px-2 text-[9px] text-muted-foreground "
          >
            <div id="title" className="text-[11px] font-semibold text-black">
              {props.data.title}
            </div>
            <div id="description" className="w-4/5">
              {props.data.description}
            </div>

            <div
              id="line-1"
              className="w-full h-4 mt-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <DollarSign className="w-3 h-3" />
                {props.data.price}
              </div>
              <div className="flex gap-[2px]">
                <CalendarDaysIcon className="w-3 h-3" />
                45 Days
              </div>
            </div>

            <div
              id="line-2"
              className="w-full h-4 mt-2 flex justify-between items-center"
            >
              <div className="flex items-center gap-[2px]">
                <Eye className="w-3 h-3" />
                {props.data.engagement}
              </div>
              <div className="flex gap-1">
                <Users className="w-3 h-3" />
                <span>{props.data.applications}</span> Applied
              </div>
            </div>

            <div id="requirements" className="mt-2">
              Requirements: <span>{props.data.requirements}</span>
            </div>

            <div id="deadline" className="mt-1">
              Deadline: <span>{props.data.deadline}</span>
            </div>

            <Button className="mt-1 rounded-full text-[9px]">Apply Now</Button>
          </div>
        </div>
      </div>

      <div
        id="camera-campaign-card"
        className="absolute rounded-full bottom-40 left-2"
      >
        <img
          src={CameraCampaign}
          className="w-[90px] h-[90px] rounded-full border-2 border-muted-foreground/5 bg-green-50 shadow-2xl shadow-muted-foreground/20"
        />
      </div>
    </motion.div>
  )
}

export function ProfileCard({
  children,
  className,
  position = 'bottom-left',
}: {
  children: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}) {
  return (
    <motion.div
      animate={{
        y: ['100%', '0%'],
      }}
      className={cn('w-full h-full relative ', className)}
    >
      <div className="w-full h-full bg-primary z-0 absolute -left-4 -top-4 rounded-2xl"></div>

      <div className="w-full h-full bg-secondary z-10 absolute -right-4 -bottom-4 rounded-2xl"></div>

      <div className="w-full h-full bg-background z-20 absolute rounded-2xl font-karantina">
        {children}
      </div>

      <div
        className={cn(
          'flex gap-2 absolute z-20',
          position === 'top-left' && 'top-4 left-4',
          position === 'top-right' && 'top-4 right-4',
          position === 'bottom-left' && 'bottom-4 left-4',
          position === 'bottom-right' && 'bottom-4 right-4',
        )}
      >
        <div className="size-3 rounded-full bg-primary"></div>
        <div className="size-3 rounded-full bg-secondary"></div>
        <div className="size-3 rounded-full bg-secondary"></div>
      </div>
    </motion.div>
  )
}
