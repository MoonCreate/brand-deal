import { useLoaderData, useNavigate } from '@tanstack/react-router'
import { BookPlus, Check, Facebook, Instagram, Twitter, X } from 'lucide-react'
import { motion } from 'motion/react'
import type { Creator } from '@/types'
import type { Address } from 'viem'
import { Button } from '@/components/buttons/button'
import { CampaignCard } from '@/components/cards/card'
import { useApproveCampaignCreator } from '@/hooks/use-approve-campaign-creator'
import { SocialCard } from '@/components/cards/social-card'
import { bop } from '@/lib/animation-const'

export const CampaignApprovalContent = () => {
  const [{ mutate, isPending }] = useApproveCampaignCreator()
  const item = useLoaderData({
    from: '/_no-layout/campaign/approval/$id',
  }) as any;
  const nav = useNavigate({ from: '/campaign/approval/$id' })

  const handleBackClick = () => {
    nav({ to: '/dashboard' })
  }

  const handleCheckClick = (addr: Address) => mutate([item.campaignNFTId, addr])

  return (
    <div>
      <div
        id="campaign"
        className="h-full flex items-center fixed left-0 top-1/2 -translate-y-1/2 w-[32%] justify-center"
      >
        <Button className="fixed left-5 top-4" onClick={handleBackClick}>
          Back
        </Button>
        <div className="w-fit mt-14 relative">
          <div
            id="campaign-label"
            className="px-4 w-fit h-14  z-50 absolute -top-6 left-4 -translate-x-1/2 rounded-2xl text-[2.5rem] font-karantina flex items-center justify-center bg-primary text-white shadow-box"
          >
            Campaign
          </div>
          <CampaignCard
            className="max-w-[300px]"
            buttonChild={<></>}
            data={{
              label: item.status ?? '',
              title: item.metadata?.name,
              description: item.metadata?.description,
              price: item.metadata.attributes[1].value,
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
            }}
          />
        </div>
      </div>
      <div
        id="campaign-approval"
        className="w-[68%] fixed right-0 top-0 bottom-0 h-[calc(100vh-64px)] border-l bg-primary/80 overflow-y-auto rounded-md shadow-box my-auto"
      >
        <div className="text-8xl text-center bg-primary font-karantina py-2 font-bold text-white sticky top-0 z-10">
          CAMPAIGN SUBMITTER
        </div>

        <div className="h-full overflow-y-auto flex flex-col gap-8 pl-10 pr-4 py-4">
          {/* @ts-ignore akwjadkjkafjaj */}
          {item.creatorPools.items.map((data) => {
            const creator = data.creator as Creator
            return (
              <motion.div
                animate={bop}
                key={data.creatorcreatorWalletAddress}
                className="w-full bg-black/20 flex relative rounded-r-2xl rounded-l-full p-4 gap-6"
              >
                <div className="size-50 rounded-full overflow-hidden relative">
                  <img
                    src={creator.metadata.image}
                    className="aspect-square z-29 object-cover size-full"
                  />
                  <div className="z-40 bg-green-30 w-full h-auto flex gap-4 py-3 bottom-0 bg-black/20 absolute  items-center justify-center">
                    <SocialCard social={creator.metadata.attributes[3].value} />
                  </div>
                </div>
                <div className="flex flex-col mt-6">
                  <div className="text-5xl font-karantina font-bold text-white max-w-[40ch]">
                    {creator.metadata.name}
                  </div>
                  <div className="text-2xl  text-white">
                    {creator.metadata.attributes[1].value}
                  </div>
                </div>
                <div className=" ml-auto  flex gap-1 pb-7 self-end">
                  <Button
                    isLoading={isPending}
                    onClick={() =>
                      handleCheckClick(creator.creatorWalletAddress)
                    }
                  >
                    <Check className="mx-auto size-4" /> Approve
                  </Button>
                </div>
                {/* footer  */}
                <div className={'flex gap-2 absolute z-20 bottom-4 right-4'}>
                  <div className="size-3 rounded-full bg-primary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
