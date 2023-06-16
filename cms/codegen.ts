import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const WHEELGO_API = process.env.NEXT_PUBLIC_WHEELGO_API

const config: CodegenConfig = {
  schema: `${WHEELGO_API}/graphql`,
  documents: ['src/graphql/**/*.{ts,tsx}'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/generated-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config
