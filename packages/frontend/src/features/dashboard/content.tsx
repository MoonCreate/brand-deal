import { Bookmark, Globe, LucideLink, Mail } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { CampaignCard } from '../../components/cards/card'
import { SubmissionReview } from './submission-review'
import type { Brand } from '@/types'
import { Button, getButtonStyle } from '@/components/buttons/button'
import { SocialCard } from '@/components/cards/social-card'
import { useGetCampaigns } from '@/hooks/use-get-campaign'
import { bop } from '@/lib/animation-const'
import { dialogInjection } from '@/injection/dialog-injection'

function CampaignList() {
  const dialog = dialogInjection.use()
  const account = useAccount()
  const { data, isLoading } = useGetCampaigns({
    brand: account.address,
  })

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
        submitMetadataURI: item.submitMetadataURI,
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
    <div className="flex flex-1 gap-3 mt-3">
      {processedData?.map((x, i) => (
        <CampaignCard
          className="max-w-[280px]"
          key={i}
          data={x as never}
          buttonChild={
            x.status === 'UnderReview' ? (
              <Button
                onClick={() => {
                  dialog.open(<SubmissionReview item={x} />)
                }}
              >
                Review
              </Button>
            ) : (
              <Link
                className={getButtonStyle('default')}
                to={`/campaign/approval/$id`}
                params={{ id: x.id }}
              >
                Choose Creator
              </Link>
            )
          }
        />
      ))}
    </div>
  )
}

export const DashboardContent = (props: { brand: Brand }) => {
  const nav = useNavigate({ from: '/dashboard' })

  const handleCreateClick = () => {
    nav({ to: '/new-campaign' })
  }
  return (
    <div className="w-full min-h-full mt-4 flex flex-col grow relative">
      <div className="font-karantina text-7xl ">
        {props.brand.metadata.name}
      </div>

      <div className="flex-1 flex flex-row gap-4 mt-5">
        {/* LEFT CONTENT  */}
        <div id="left-content" className="w-1/5 flex flex-col gap-4">
          <div id="left-content-1" className="h-64 bg-surface-1 rounded-4xl">
            <img
              src={props.brand.metadata.image}
              className="w-full h-full rounded-md"
            />
          </div>
          <div
            id="left-content-1"
            className="h-full bg-surface-1 rounded-4xl p-6 text-muted-foreground "
          >
            <div id="description" className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center font-bold">
                <Bookmark className="w-4 h-4" /> Description
              </div>
              <div className="italic">{props.brand.metadata.description}</div>
            </div>
            <div id="email" className="flex gap-2 flex-col mt-6">
              <div className="flex gap-2 items-center font-bold">
                <Mail className="w-4 h-4" /> Email
              </div>
              <div className="">{props.brand.metadata.attributes[1].value}</div>
            </div>
            <div id="website" className="flex gap-2 flex-col mt-6">
              <div className="flex gap-2 items-center font-bold">
                <Globe className="w-4 h-4" /> Website
              </div>
              <div className="">{props.brand.metadata.attributes[2].value}</div>
            </div>
            <div id="social" className="flex gap-2 flex-col mt-6">
              <div className="flex gap-2 items-center font-bold">
                <LucideLink className="w-4 h-4" /> Social Links
              </div>
              <div className="">
                <SocialCard social={props.brand.metadata.attributes[4].value} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT  */}
        <div
          id="right-content"
          className="w-4/5 rounded-4xl flex flex-col bg-surface-1 p-6 relative"
        >
          <div className="h-28 border-b-2  border-black flex">
            <div className="font-karantina text-7xl ">Campaigns</div>
          </div>

          <Button onClick={handleCreateClick} className="w-fit ml-auto mt-2">
            Create
          </Button>
          <CampaignList />
        </div>
      </div>
    </div>
  )
}
