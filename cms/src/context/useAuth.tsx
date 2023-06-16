import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/router'

import { getGravatarUrl } from '~/utils/gravatar.util'
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from '~/utils/localstorage.util'
import { useGetMyProfileLazyQuery, useLoginMutation } from '~/generated-types'

interface AuthContextData {
  signin: (email: string, password: string) => Promise<void>
  signout: () => void
  user: null | User
}

interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
  impairmentLevel: string
  equipment?: string
}

const DefaultAuthContextData = {
  signin: () => {
    throw new Error('signin is not implemented')
  },
  signout: () => {
    throw new Error('signout is not implemented')
  },
  user: null,
} satisfies AuthContextData

const authContext = createContext<AuthContextData>(DefaultAuthContextData)

export function useAuth() {
  return useContext(authContext)
}

function useAuthProvider() {
  const router = useRouter()
  const [user, setUser] = useState<null | User>(null)

  const [getProfile, { data: _profileData }] = useGetMyProfileLazyQuery()
  const [loginUser, { data: _loginData }] = useLoginMutation()

  const handleUserChange = async () => {
    const { accessToken, refreshToken } = getUserToken()

    if (!accessToken || !refreshToken) {
      setUser(null)
      return
    }

    const result = await getProfile()

    if (!result || !result.data?.me) {
      throw new Error('Get User Profile Failed')
    }

    const { me } = result.data

    if (me) {
      setUser({
        id: me.id || '',
        username: me.username || '',
        firstName: me.firstname || '',
        lastName: me.lastname || '',
        email: '',
        image: getGravatarUrl(''),
        impairmentLevel: '',
        equipment: '',
      })
    }
  }

  useEffect(() => {
    handleUserChange()
  }, [])

  const signin = async (email: string, password: string) => {
    const { data, errors } = await loginUser({
      variables: {
        email,
        password,
      },
    })

    console.log(data, errors)

    if (!data) {
      throw new Error('Login failed')
    }

    const { accessToken, refreshToken } = data.login

    setUserToken(accessToken, refreshToken)
    await handleUserChange()

    router.replace('/')
  }

  const signout = async () => {
    removeUserToken()
    setUser(null)
  }

  return {
    signin,
    signout,
    user,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
