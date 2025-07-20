import { CalendarDaysIcon, DollarSign, Eye, Users } from 'lucide-react'

import { motion } from 'motion/react'
import CameraCampaign from '../../../assets/camera-campaign-card.png'

import { Button } from '../buttons/button'
import type { HTMLMotionProps } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'
import { cn } from '@/lib/utils'
import { flipCard } from '@/lib/animation-const'

const CAMPAIGN_DUMMY_DATA = {
  label: 'Soon',
  title: 'iPhone 15 Pro Creator',
  description:
    'Create stunning content show casing iPhone 15 Pro camera capabilities',
  price: '75,000',
  category: 'Technology',
  requirements: '5M+ followers',
  engagement: '6.8M',
  applications: '156',
  image: CameraCampaign,
  logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
  status: 'Active',
  deadline: 'Dec 15, 2024',
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
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      animate={flipCard}
      whileHover={{ scale: 1.05 }}
      className="w-full h-[450px]  rounded-4xl relative border"
      id="campaign-card"
      {...props}
    >
      <img
        src={
          'https://i.pinimg.com/1200x/93/31/24/933124fe6b508c2ab7cec6770bc085f5.jpg'
        }
        className="rounded-4xl w-full h-full border-2 border-muted-foreground/40"
      />
      <div
        id="label"
        className="min-w-28 h-8  absolute right-0 top-9 flex items-center px-4 rounded-l-2xl gap-2 bg-blue-100 shadow-xl shadow-muted-foreground/40"
      >
        ● <span className="text-sm font-bold">{CAMPAIGN_DUMMY_DATA.label}</span>
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
                45+
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT  */}
          <div
            id="child-content"
            className="w-full rounded-r-4xl px-2 text-[9px] text-muted-foreground "
          >
            <div id="title" className="text-[11px] font-semibold text-black">
              {CAMPAIGN_DUMMY_DATA.title}
            </div>
            <div id="description" className="w-4/5">
              {CAMPAIGN_DUMMY_DATA.description}
            </div>

            <div
              id="line-1"
              className="w-full h-4 mt-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <DollarSign className="w-3 h-3" />
                {CAMPAIGN_DUMMY_DATA.price}
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
                {CAMPAIGN_DUMMY_DATA.engagement}
              </div>
              <div className="flex gap-1">
                <Users className="w-3 h-3" />
                <span>{CAMPAIGN_DUMMY_DATA.applications}</span> Applied
              </div>
            </div>

            <div id="requirements" className="mt-2">
              Requirements: <span>{CAMPAIGN_DUMMY_DATA.requirements}</span>
            </div>

            <div id="deadline" className="mt-1">
              Deadline: <span>{CAMPAIGN_DUMMY_DATA.deadline}</span>
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
