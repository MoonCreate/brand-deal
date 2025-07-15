import { useQuery } from '@tanstack/react-query'
import { hc } from 'hono/client'
import type { InferRequestType } from 'hono/client'
import type app from '~backend/src/api/index'

export const backend = hc<typeof app>(import.meta.env.VITE_REST_SERVER)

export function createBackendQuery<TResponse, T extends (...args: Array<any>) => Promise<TResponse>>(
  select: (build: typeof backend) => T,
  queryKey: string,
) {
  const r = select(backend)
  return (request: InferRequestType<T>) => {
    return useQuery({
      queryKey: [queryKey, request],
      queryFn: () => r(request),
    })
  }
}
