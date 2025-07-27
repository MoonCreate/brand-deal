import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createFileRoute('/_no-layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-[min(100vw-2rem,1200px)] mx-auto min-h-screen flex flex-col ">
      <Outlet />
      <Toaster />
    </div>
  )
}
