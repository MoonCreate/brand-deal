import { LucideHeart, LucideStar, LucideTrendingUp } from 'lucide-react'
import { Melt } from './components/melt'
import { cn } from '@/lib/utils'

export function HomePage() {
  return (
    <>
      {/* HERO */}
      <div className="flex px-6 h-[calc(100vh-88px)]">
        <div className="flex flex-col mt-2">
          <div>
            <h2 className="text-9xl font-karantina">BRAND DEAL</h2>
            <h3 className="text-2xl">You campaign, creator apply</h3>
          </div>
          <div
            className={cn(
              'relative isolate',
              'before:-z-1 before:absolute before:inset-0 before:bg-primary before:rounded-xl before:translate-15',
              'after:-z-1 after:absolute after:inset-0 after:bg-secondary after:rounded-xl after:-translate-10',
              'before:shadow-md after:shadow-md',
              'self-start mt-30',
            )}
          >
            <div className="bg-surface-1 rounded-xl shadow-box p-6">
              <div className="bg-surface-2 rounded-xl h-[182px] w-[300px]"></div>
              <h2 className="font-karantina text-5xl mt-5">Chimera</h2>
              <p className="">Brand</p>
              <div className="flex gap-2 items-center text-primary font-semibold text-lg">
                <LucideTrendingUp strokeWidth={3} className="size-4" /> 5.000
                <div className="ml-auto flex gap-2">
                  <div className="size-3 rounded-full bg-primary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                  <div className="size-3 rounded-full bg-secondary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex grow justify-end items-start">
          <div
            className={cn(
              'relative isolate',
              'before:-z-1 before:absolute before:inset-0 before:bg-secondary before:rounded-xl before:translate-15',
              'after:-z-1 after:absolute after:inset-0 after:bg-primary after:rounded-xl after:-translate-6',
              'before:shadow-md after:shadow-md after:size-8/12',
              'mt-15',
            )}
          >
            <div>
              <div className="bg-surface-1 w-[calc(100%-5rem)] shadow-box h-10 -mb-px rounded-t-xl"></div>
              <div className="bg-surface-1 rounded-x-xl rounded-b-xl rounded-tr-xl shadow-box p-6">
                <div className="bg-surface-2 rounded-xl h-[324px] w-[479px]"></div>
                <h2 className="font-karantina text-5xl mt-5">Chimera</h2>
                <p className="">Brand</p>
                <div className="flex gap-2 items-center text-primary font-semibold text-lg">
                  <LucideHeart strokeWidth={3} className="size-4" /> 90
                  <div className="ml-auto flex gap-2">
                    <div className="size-3 rounded-full bg-primary"></div>
                    <div className="size-3 rounded-full bg-secondary"></div>
                    <div className="size-3 rounded-full bg-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WHATS OUR FEATURE */}
      <div className="min-h-screen flex py-10 -mx-30">
        <div className="bg-blacked grow rounded-xl relative p-5 flex flex-col isolate">
          <h2 className="text-9xl font-karantina text-white self-end">
            WHATS OUR FEATURE
          </h2>
          <div className="flex gap-10 mx-auto my-auto">
            {Array.from({ length: 3 }, (_, i) => (
              <div className="flex flex-col self-center h-92 w-70" key={i}>
                <div className="bg-surface-1 pb-2 pt-6 px-6 rounded-b-xl shadow-box grow rounded-tr-xl text-blacked flex flex-col">
                  <div className="bg-surface-2 h-40 rounded-md"></div>
                  <h2 className="text-4xl font-karantina mt-auto">
                    Lorem Ipsum
                  </h2>
                  <p className="text-lg">Lorem Ipsum Dolor Sit Amet,</p>
                  <div className="ml-auto flex gap-2 mt-6">
                    <div className="size-3 rounded-full bg-blacked"></div>
                    <div className="size-3 rounded-full bg-blacked"></div>
                    <div className="size-3 rounded-full bg-blacked"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-auto flex gap-3 mt-6 mx-auto">
            <div className="size-3 rounded-full bg-white"></div>
            <div className="size-3 rounded-full bg-white"></div>
            <div className="size-3 rounded-full bg-white"></div>
          </div>
          <Melt />
        </div>
      </div>
      {/* WHATS THEY SAY ABOUT US*/}
      <div className="h-screen flex flex-col py-5">
        <h2 className="text-9xl font-karantina text-black self-center">
          WHATS THEY SAY ABOUT US
        </h2>
        <div className="flex gap-10 m-auto">
          {Array.from({ length: 3 }, (_, i) => (
            <div className="flex flex-col self-center h-92 w-50" key={i}>
              <div
                className={cn(
                  'bg-surface-1 pb-2 pt-6 px-6 rounded-b-xl shadow-box grow rounded-tr-xl text-blacked flex flex-col relative',
                  'before:absolute isolate before:inset-0 before:h-1/4 before:bg-primary before:-z-1 before:rounded-t-xl',
                )}
              >
                <div className="bg-surface-2 rounded-full mx-auto aspect-square w-full"></div>
                <h2 className="text-4xl font-karantina mt-auto">Lorem Ipsum</h2>
                <p className="text-lg">Lorem Ipsum Dolor Sit Amet,</p>
                <div className="ml-auto flex gap-2 mt-6">
                  <LucideStar
                    className="text-primary fill-primary"
                    strokeWidth={3}
                  />
                  <LucideStar
                    className="text-primary fill-primary"
                    strokeWidth={3}
                  />
                  <LucideStar
                    className="text-primary fill-primary"
                    strokeWidth={3}
                  />
                  <LucideStar className="text-primary" strokeWidth={3} />
                  <LucideStar className="text-primary" strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col py-6 -mx-30 h-screen">
        <div className="bg-blacked rounded-xl flex flex-col p-5 h-full justify-center">
          <div className="w-max self-center ">
            <h2 className="text-9xl font-karantina text-white">
              READY TO JOIN WITH US ?
            </h2>
            <div className="flex gap-6 justify-between [&>button]:grow mt-6">
              <button className="bg-white p-4 font-karantina text-blacked text-4xl rounded-xl">
                JOIN AS BRAND
              </button>
              <button className="bg-white p-4 font-karantina text-blacked text-4xl rounded-xl">
                JOIN AS INFLUENCER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
