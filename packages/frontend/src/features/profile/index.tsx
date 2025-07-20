import { Facebook, Instagram, Twitter } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import type { Creator } from '@/types'
import type { CampaignCardData } from '@/components/cards/card'
import { CampaignCard, ProfileCard } from '@/components/cards/card'
import { bop, pulseScale } from '@/lib/animation-const'
import { useGetCampaigns } from '@/hooks/use-get-campaign'
import { Button } from '@/components/buttons/button'

function CampaignList() {
  const account = useAccount()
  const { data, isLoading } = useGetCampaigns({
    creator: account.address,
  })

  const processedData = useMemo(
    () =>
      data?.campaigns.items.map(
        (item) =>
          ({
            label: item.status ?? '',
            title: item.metadata?.name,
            description: item.metadata?.description,
            price: item.stakedAmount!,
            category: 'Technology',
            requirements: item.metadata?.requirements,
            applications: item.creatorPools.items.length + '',
            image: item.metadata?.image,
            logo: item.brand.metadata?.image,
            status: item.status!,
            engagement: item.metadata.engagment,
            deadline: item.metadata?.deadline,
            brandLogo: item.brand.metadata.image,
            brandName: item.brand.metadata.name,
          }) satisfies CampaignCardData,
      ),
    [data],
  )

  return isLoading ? (
    <div className="flex flex-1 gap-3 mt-3">
      <motion.div
        animate={bop}
        className="w-[289px] h-[448px] rounded-xl bg-gray-500 animate-pulse"
      ></motion.div>
      <motion.div
        animate={bop}
        className="w-[289px] h-[448px] rounded-xl bg-gray-500 animate-pulse"
      ></motion.div>
      <motion.div
        animate={bop}
        className="w-[289px] h-[448px] rounded-xl bg-gray-500 animate-pulse"
      ></motion.div>
    </div>
  ) : (
    <div className="grid relative z-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
      {processedData?.map((x, i) => (
        <CampaignCard
          className="max-w-[280px]"
          key={i}
          data={x as never}
          buttonChild={<Button>Withdraw</Button>}
        />
      ))}
    </div>
  )
}

export const Profile = (props: { profile: Creator }) => {
  return (
    <main className="p-8  grow bg-blue-100/5 flex flex-col justify-between gap-10">
      {/* profile  */}
      <div className="w-full flex gap-8 h-44 pr-4">
        <div className="relative group">
          <motion.div
            animate={pulseScale}
            className="w-44 h-44 rounded-2xl p-2 transition-all duration-300 hover:scale-105 hover:-rotate-1"
          >
            <div className="relative rounded-xl w-full h-full overflow-hidden bg-white">
              <img
                src={props.profile.metadata.image}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>

        <ProfileCard position="top-right">
          <div className="px-4 pt-4 text-4xl">
            {props.profile.metadata.name}
          </div>
          <div id="profile-description" className="text-xl px-4 text-black/80">
            {props.profile.metadata.description}
          </div>

          <div className="flex gap-4 absolute right-4 bottom-3 w-full pl-7 items-center">
            <hr className="w-full ml-auto mx-4 text-black" />
            <Facebook className="p-[5px] rounded-lg bg-primary" size={30} />
            <Twitter className="p-[5px] rounded-lg bg-secondary" size={30} />
            <Instagram className="p-[5px] rounded-lg" size={30} />
          </div>
        </ProfileCard>
      </div>

      <div
        id="campaign-board"
        className="w-full flex  justify-start flex-col grow rounded-2xl relative mb-10 border-l-0 border-t-0 p-10 shadow-2xl shadow-primary/80 z-40"
      >
        {/* LABEL */}
        <div
          id="campaign-label"
          className="w-40 h-20 z-50 absolute top-6 left-10 -translate-x-1/2 rounded-2xl text-[3rem] font-karantina flex items-center justify-center bg-primary text-white shadow-2xl"
        >
          Campaign
        </div>
        <CampaignList />
      </div>
    </main>
  )
}
