import { hc } from 'hono/client'
import type app from '~backend/src/index'

export const backend = hc<typeof app>('http://localhost:3000')
