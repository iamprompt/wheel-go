import { createContext } from 'react'

import { customContext } from 'storeon/react'

import { store } from '~/store/storeon'

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export function StoreonProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}
