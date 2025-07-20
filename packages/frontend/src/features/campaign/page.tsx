import { LucideSearch } from 'lucide-react'
import { motion } from 'motion/react'
import { useAccount } from 'wagmi'
import { useMemo } from 'react'
import { Button } from '@/components/buttons/button'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { bop } from '@/lib/animation-const'
import { CampaignCard } from '@/components/cards/card'
import { ConnectButton } from '@/components/buttons/connect-button'
import { useGetCampaigns } from '@/hooks/use-get-campaign'
import { useApplyCampaign } from '@/hooks/use-apply-campaign'

function CampaignList() {
  const account = useAccount()
  const { data, isLoading } = useGetCampaigns({})
  const [{ mutate, isPending }] = useApplyCampaign()

  const processedData = useMemo(
    () =>
      data?.campaigns.items.map((item) => ({
        id: item.campaignNFTId,
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
      })),
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
    <div className="flex gap-5">
      {processedData?.map((x, i) => (
        <CampaignCard
          className="max-w-[289px]"
          key={i}
          data={x as never}
          buttonChild={
            account.address ? (
              <Button
                onClick={() => {
                  mutate(x.id)
                }}
                isLoading={isPending}
              >
                Apply Now
              </Button>
            ) : (
              <ConnectButton />
            )
          }
        />
      ))}
    </div>
  )
}

export function CampaignPage() {
  return (
    <div className="flex flex-col px-6 min-h-[calc(100vh-88px)] pb-20">
      <motion.div className="mb-6 origin-left" animate={bop}>
        <h1 className="text-9xl font-karantina">CAMPAIGN</h1>
        <p className="text-2xl overflow-x-hidden">
          <SplitPopAnimation text="Discover and apply to brand campaigns from top companies" />
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input placeholder="Search campaigns..." className="pl-10" />
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="overflow-auto">
        <motion.div className="flex gap-6 p-6 w-max" animate={bop}>
          <CampaignList />
        </motion.div>
      </div>
    </div>
  )
}
