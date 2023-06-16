import type { ReactNode } from 'react'

import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  Observable,
  type FetchResult,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { GraphQLError } from 'graphql'

import { env } from '~/utils/env'
import { getUserToken, setUserToken } from '~/utils/localstorage.util'
import { REFRESH_TOKEN } from '~/graphql/mutation/auth'

const uploadLink = createUploadLink({
  uri: `${env.NEXT_PUBLIC_WHEELGO_API}/graphql`,
})

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

const authLink = setContext(async (_, { headers }) => {
  const { accessToken: token } = getUserToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

async function refreshToken() {
  const { refreshToken } = await getUserToken()

  const { data } = await client.mutate({
    mutation: REFRESH_TOKEN,
    variables: {
      refreshToken,
    },
  })

  if (
    data?.refresh &&
    data?.refresh?.accessToken &&
    data?.refresh?.refreshToken
  ) {
    setUserToken(data.refresh.accessToken, data.refresh.refreshToken)
    return data.refresh
  }
}

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      const observable = new Observable<FetchResult<Record<string, any>>>(
        (observer) => {
          // used an annonymous function for using an async function
          ;(async () => {
            try {
              const accessToken = await refreshToken()

              if (!accessToken) {
                throw new GraphQLError('Empty AccessToken')
              }

              // Retry the failed request
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              }

              forward(operation).subscribe(subscriber)
            } catch (err) {
              observer.error(err)
            }
          })()
        },
      )

      return observable
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  },
)

const apolloLinks = from([errorLink, authLink, uploadLink])
client.setLink(apolloLinks)

export function WheelGoApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
