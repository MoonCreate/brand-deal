import { BrandListCards } from './brand-list-cards'
import { TitleHeadline } from './title-headline'
import { CreatorListCard } from './creator-list-cards'

export function HeroSection() {
  return (
    <div className="flex px-6 h-[calc(100vh-88px)]">
      <div className="flex flex-col mt-2">
        <TitleHeadline />
        <BrandListCards />
      </div>
      <div className="flex grow justify-end items-start">
        <CreatorListCard />
      </div>
    </div>
  )
}
