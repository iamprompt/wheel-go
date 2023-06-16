import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
    NEXT_PUBLIC_WHEELGO_API: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_WHEELGO_API: process.env.NEXT_PUBLIC_WHEELGO_API,
  },
})
