import { useNavigate } from '@tanstack/react-router'
import { Check, Facebook, Instagram, Twitter, X } from 'lucide-react'
import { Button } from '@/components/buttons/button'
import { CampaignCard } from '@/components/cards/card'

export const CampaignApprovalContent = () => {
  const nav = useNavigate({ from: '/campaign/approval' })

  const handleBackClick = () => {
    nav({ to: '/campaign' })
  }

  const handleCheckClick = () => {
    nav({ to: '/campaign/approve' })
  }

  return (
    <div>
      <div
        id="campaign"
        className="h-full flex items-center fixed left-0 top-1/2 -translate-y-1/2 w-[32%] bg-black justify-center"
      >
        <Button className="fixed left-5 top-4" onClick={handleBackClick}>
          Back
        </Button>
        <div className="w-fit mt-14 relative">
          <div
            id="campaign-label"
            className="px-4 w-fit h-14  z-50 absolute -top-6 left-4 -translate-x-1/2 rounded-2xl text-[2.5rem] font-karantina flex items-center justify-center bg-primary text-white"
          >
            Campaign
          </div>
          <CampaignCard />
        </div>
      </div>
      <div
        id="campaign-approval"
        className="w-[68%] fixed right-0 top-0 h-screen border-l bg-primary/80"
      >
        <div className="text-8xl text-center bg-black/40 font-karantina py-2 font-bold text-white shadow-lg shadow-white">
          CAMPAIGN SUBMITTER
        </div>

        <div className="h-full overflow-y-auto flex flex-col gap-8 pl-10 pr-4 py-4">
          {new Array(50).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-full min-h-80 bg-black/20 flex relative rounded-r-2xl rounded-l-full p-4 gap-6"
            >
              <div className="min-w-80 w-80 h-full rounded-full overflow-hidden relative">
                <img
                  src="https://deadline.com/wp-content/uploads/2023/03/Keanu-Reeves-john-wick-4.jpg"
                  className="w-full h-full z-30"
                />
                <div className="z-40 bg-green-30 w-full h-auto flex gap-4 py-3 bottom-0 bg-black/20 absolute  items-center justify-center">
                  <Facebook className="text-white hover:cursor-pointer" />
                  <Twitter className="text-white hover:cursor-pointer" />
                  <Instagram className="text-white hover:cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col mt-6">
                <div className="text-8xl font-karantina font-bold text-white max-w-[40ch]">
                  BRYAN DEWA WICAKSANA ASDASDASD
                </div>
                <div className="text-2xl  text-white">
                  bryandewawicaksana@gmail.com
                </div>
              </div>
              <div className="flex-1 h-full  flex gap-1 pb-7">
                <Button onClick={handleBackClick} className="w-1/2 bg-primary">
                  <X size={40} className="mx-auto" />
                </Button>
                <Button
                  onClick={handleCheckClick}
                  className="w-1/2 bg-secondary hover:bg-secondary/80"
                >
                  <Check size={40} className="mx-auto" />
                </Button>
              </div>
              {/* footer  */}
              <div className={'flex gap-2 absolute z-20 bottom-4 right-4'}>
                <div className="size-3 rounded-full bg-primary"></div>
                <div className="size-3 rounded-full bg-secondary"></div>
                <div className="size-3 rounded-full bg-secondary"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
