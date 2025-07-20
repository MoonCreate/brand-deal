import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import type { Config } from 'wagmi'

interface MyRouterContext {
  queryClient: QueryClient
  wagmiConfig: Config
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})
