import { buildConfig } from 'payload/config'
import path from 'path'
// import Examples from './collections/Examples';
import Users from './collections/Users'

import dotenv from 'dotenv'

dotenv.config()

const SERVER_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL

export default buildConfig({
  serverURL: SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
