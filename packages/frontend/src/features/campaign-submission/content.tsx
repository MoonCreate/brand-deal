import { motion } from 'motion/react'
import { Button } from '@/components/buttons/button'
import { CampaignCard, ProfileCard } from '@/components/cards/card'
import { DropZone } from '@/components/inputs/dropzone'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { bop, pulseScale, wiggleEntry } from '@/lib/animation-const'

export const CampaignSubmissionContent = () => {
  return (
    <div className="w-full min-h-full my-10 flex flex-col grow relative">
      <div
        id="campaign-submission-content"
        className="w-full grow flex relative"
      >
        <div className="h-full w-[400px] flex items-center">
          <div className="w-fit mt-14 relative">
            <div
              id="campaign-label"
              className="px-4 w-fit h-14 shadow-pink-300 z-50 absolute -top-6 left-4 -translate-x-1/2 rounded-2xl text-[2.5rem] font-karantina flex items-center justify-center bg-primary text-white shadow-2xl"
            >
              Campaign
            </div>
            <CampaignCard />
          </div>
        </div>
        <ProfileCard className="flex-1 rounded-3xl overflow-hidden z-10 relative">
          <div className="font-karantina text-[3rem] text-center mt-10  absolute z-30 right-1/2 translate-x-1/2 text-white">
            <SplitPopAnimation text="Campaign" />{' '}
            <SplitPopAnimation text="Submission" />
          </div>
          <motion.div
            animate={pulseScale}
            className="absolute w-full z-10 h-full"
          >
            <DropZone wrapperClassName="w-full h-full bg-primary rounded-3xl" />
          </motion.div>
          <div className="w-full h-12 bottom-0 left-0 bg-black/20 z-40 absolute shadow-2xl"></div>
          <div className="w-10 h-full bottom-0  bg-secondary z-40 absolute right-0 shadow-2xl "></div>
          <Button className="absolute bottom-0 right-0 z-40 h-12 w-20 flex justify-center shadow-2xl shadow-black">
            Submit
          </Button>
        </ProfileCard>
      </div>
    </div>
  )
}
