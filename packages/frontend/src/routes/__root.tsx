import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  LucideFacebook,
  LucideGithub,
  LucideInstagram,
  LucideTwitter,
} from 'lucide-react'

import Header from '../components/header/header'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'
import type { Config } from 'wagmi'

interface MyRouterContext {
  queryClient: QueryClient
  wagmiConfig: Config
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <main className="bg-background font-roboto">
        <div className="w-[min(100vw-2rem,1200px)] mx-auto min-h-screen flex flex-col">
          <Header />
          <Outlet />
        </div>
        {/* FOOTER */}
        <footer className="bg-primary shadow-inner py-20 space-y-10">
          <h2 className="text-9xl font-karantina text-white mx-auto w-max">
            BRAND DEAL
          </h2>
          <div className="flex justify-evenly text-white [&>svg]:size-10 w-200 mx-auto">
            <LucideGithub />
            <LucideFacebook />
            <LucideInstagram />
            <LucideTwitter />
          </div>
          <div className="text-xs text-white w-96 mx-auto text-center">
            ©2024-2025 Brand Deal. Hak Cipta Dilindungi Undang-Undang. Merek
            dagang dari PT Jadi Dulu, perusahaan terdaftar di Indonesia.
          </div>
        </footer>
      </main>
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  ),
})
