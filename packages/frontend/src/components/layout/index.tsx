import {
  LucideFacebook,
  LucideGithub,
  LucideInstagram,
  LucideTwitter,
} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { DialogProvider } from '../dialog/dialog'
import Header from '../header/header'
import TanStackQueryLayout from '@/integrations/tanstack-query/layout'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="bg-background font-roboto">
        <div className="w-[min(100vw-2rem,1200px)] mx-auto min-h-screen flex flex-col">
          <DialogProvider>
            <Header />
            {children}
          </DialogProvider>
        </div>
        {/* FOOTER */}
        <footer className="bg-primary shadow-inner py-20 space-y-10">
          <h2 className="text-9xl font-karantina text-white mx-auto w-max">
            Kollabora
          </h2>
          <div className="flex justify-evenly text-white [&>svg]:size-10 w-200 mx-auto">
            <LucideGithub />
            <LucideFacebook />
            <LucideInstagram />
            <LucideTwitter />
          </div>
          <div className="text-xs text-white w-96 mx-auto text-center">
            ©2024-2025 Kollabora. Hak Cipta Dilindungi Undang-Undang. Merek
            dagang dari PT Jadi Dulu, perusahaan terdaftar di Indonesia.
          </div>
        </footer>
        <Toaster />
      </main>
      <TanStackQueryLayout />
    </>
  )
}
