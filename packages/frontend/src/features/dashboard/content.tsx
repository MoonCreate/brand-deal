import { Bookmark, Mail } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import CampaignCamera from '../../../assets/camera-campaign-card.png'
import { CampaignCard } from '../../components/cards/card'
import { Button } from '@/components/buttons/button'

export const DashboardContent = () => {
  const nav = useNavigate({ from: '/dashboard' })

  const handleCreateClick = () => {
    nav({ to: '/new-campaign' })
  }
  return (
    <div className="w-full min-h-full mt-4 flex flex-col grow relative">
      <div className="font-karantina text-7xl ">Chimera</div>

      <div className="flex-1 flex flex-row gap-4 mt-5">
        {/* LEFT CONTENT  */}
        <div id="left-content" className="w-1/5 flex flex-col gap-4">
          <div id="left-content-1" className="h-64 bg-surface-1 rounded-4xl">
            <img src={CampaignCamera} className="w-full h-full" />
          </div>
          <div
            id="left-content-1"
            className="h-full bg-surface-1 rounded-4xl p-6 text-muted-foreground "
          >
            <div id="description" className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center font-bold">
                <Bookmark className="w-4 h-4" /> Description
              </div>
              <div className="italic">
                Chimera is brand deal camera with good visualization thats bring
                happiness...
              </div>
            </div>

            <div id="email" className="flex gap-2 flex-col mt-6">
              <div className="flex gap-2 items-center font-bold">
                <Mail className="w-4 h-4" /> Email
              </div>
              <div className="">chimera@gmail.com</div>
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

          <div className="flex flex-1 gap-3 mt-3">
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </div>
        </div>
      </div>
    </div>
  )
}
