import {
  LucideCalendarDays,
  LucideDollarSign,
  LucideEye,
  LucideSearch,
  LucideUsers,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/buttons/button'
import { SplitPopAnimation } from '@/components/text/split-pop-animation'
import { bop } from '@/lib/animation-const'
import {
  CampaignCard,
  Card,
  type CampaignCardData,
} from '@/components/cards/card'
import { cn } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/buttons/connect-button'
import { useGetCampaigns } from '@/hooks/use-get-campaign'
import { useMemo } from 'react'

const campaigns = [
  {
    id: 1,
    brand: 'Nike',
    title: 'Air Max Revolution Campaign',
    description:
      'Showcase the latest Air Max collection with authentic lifestyle content',
    budget: '$50,000',
    duration: '30 days',
    category: 'Fashion',
    requirements: '10M+ followers',
    engagement: '4.2M',
    applications: 156,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Active',
    deadline: 'Dec 15, 2024',
  },
  {
    id: 2,
    brand: 'Apple',
    title: 'iPhone 15 Pro Creator Challenge',
    description:
      'Create stunning content showcasing iPhone 15 Pro camera capabilities',
    budget: '$75,000',
    duration: '45 days',
    category: 'Technology',
    requirements: '5M+ followers',
    engagement: '6.8M',
    applications: 203,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Active',
    deadline: 'Jan 20, 2025',
  },
  {
    id: 3,
    brand: 'Coca-Cola',
    title: 'Share a Coke Moments',
    description:
      'Capture authentic moments of sharing and connection with Coca-Cola',
    budget: '$35,000',
    duration: '21 days',
    category: 'Food & Beverage',
    requirements: '2M+ followers',
    engagement: '3.1M',
    applications: 89,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Active',
    deadline: 'Dec 30, 2024',
  },
  {
    id: 4,
    brand: 'Tesla',
    title: 'Sustainable Future Campaign',
    description:
      "Highlight Tesla's impact on sustainable transportation and energy",
    budget: '$100,000',
    duration: '60 days',
    category: 'Automotive',
    requirements: '15M+ followers',
    engagement: '8.5M',
    applications: 67,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Featured',
    deadline: 'Feb 14, 2025',
  },
  {
    id: 5,
    brand: 'Adidas',
    title: 'Impossible is Nothing',
    description:
      'Inspire audiences with stories of overcoming challenges in sports',
    budget: '$45,000',
    duration: '35 days',
    category: 'Sports',
    requirements: '8M+ followers',
    engagement: '5.2M',
    applications: 134,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Active',
    deadline: 'Jan 10, 2025',
  },
  {
    id: 6,
    brand: "McDonald's",
    title: "I'm Lovin' It Creators",
    description:
      "Create fun, engaging content around McDonald's menu favorites",
    budget: '$25,000',
    duration: '28 days',
    category: 'Food & Beverage',
    requirements: '3M+ followers',
    engagement: '2.8M',
    applications: 178,
    image:
      'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=200&width=300',
    logo: 'https://preview-campaign-page-design-kzmp654mayrizwzafer0.vusercontent.net/placeholder.svg?height=60&width=60',
    status: 'Ending Soon',
    deadline: 'Dec 18, 2024',
  },
]

function CampaignList() {
  const { data, isLoading } = useGetCampaigns({})

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
    <div className="flex">
      {processedData?.map((x, i) => (
        <CampaignCard className='max-w-[289px]' key={i} data={x as never} />
      ))}
    </div>
  )
}

export function CampaignPage() {
  const account = useAccount()
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
        {/* <select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Budget Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="low">$10K - $30K</SelectItem>
              <SelectItem value="medium">$30K - $60K</SelectItem>
              <SelectItem value="high">$60K+</SelectItem>
            </SelectContent>
          </select> */}
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
