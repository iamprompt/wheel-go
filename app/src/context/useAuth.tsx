import { useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { alert, toast } from 'burnt'

import { client } from '~/utils/apollo'
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from '~/utils/asyncStorage'
import { getGravatarUrl } from '~/utils/gravatar'
import COLORS from '~/styles/colors'
import type { RegisterMutationVariables, User } from '~/generated-types'
import {
  useGetMyProfileLazyQuery,
  useLoginMutation,
  useRegisterMutation,
} from '~/generated-types'

interface AuthContextData {
  signin: (email: string, password: string) => Promise<void>
  signout: () => void
  register: (data: RegisterMutationVariables['data']) => Promise<void>
  user: null | User
}

// interface User {
//   id: string
//   username: string
//   firstName: string
//   lastName: string
//   email: string
//   image: string
//   impairmentLevel: string
//   equipment?: string
// }

const DefaultAuthContextData = {
  signin: () => {
    throw new Error('signin is not implemented')
  },
  signout: () => {
    throw new Error('signout is not implemented')
  },
  user: null,
  register: (_) => {
    throw new Error('register is not implemented')
  },
} satisfies AuthContextData

const authContext = createContext<AuthContextData>(DefaultAuthContextData)

export function useAuth() {
  return useContext(authContext)
}

function useAuthProvider() {
  const router = useRouter()
  const [user, setUser] = useState<null | User>(null)

  const [getProfile] = useGetMyProfileLazyQuery()
  const [loginUser] = useLoginMutation()
  const [registerUser] = useRegisterMutation()

  const handleUserChange = async () => {
    try {
      const { accessToken, refreshToken } = await getUserToken()

      if (!accessToken || !refreshToken) {
        setUser(null)
        return
      }

      const { data, error } = await getProfile()

      if (!data) {
        throw new Error(error?.message || 'Get User Profile Failed')
      }

      const { me } = data

      if (!me) {
        setUser(null)
        return
      }

      const userFormat = {
        id: me.id || '',
        username: me.username || '',
        firstName: me.firstname || '',
        lastName: me.lastname || '',
        email: '',
        image: getGravatarUrl(''),
        impairmentLevel: '',
        equipment: '',
      }

      setUser(userFormat)

      return userFormat
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

  useEffect(() => {
    handleUserChange()
  }, [])

  const signin = async (email: string, password: string) => {
    const { data } = await loginUser({
      variables: {
        email,
        password,
      },
    })

    if (!data) {
      throw new Error('Login failed')
    }

    const { accessToken, refreshToken } = data.login

    await setUserToken(accessToken, refreshToken)
    const u = await handleUserChange()

    toast({
      title: "You're logged in!", // required
      message: `Welcome back ${u?.firstName}!`,
      preset: 'custom',
      haptic: 'success',
      duration: 2,
      icon: {
        ios: { name: 'person.fill', color: COLORS.magenta[500] },
      },
    })

    router.replace('/')
  }

  const signout = async () => {
    await removeUserToken()
    setUser(null)
    client.refetchQueries({
      include: ['GetMyProfile'],
    })
  }

  const register = async (data: RegisterMutationVariables['data']) => {
    try {
      const { data: registerData } = await registerUser({
        variables: {
          data,
        },
      })

      if (!registerData) {
        throw new Error('Register failed')
      }

      const { accessToken, refreshToken } = registerData.register

      await setUserToken(accessToken, refreshToken)
      const u = await handleUserChange()

      alert({
        title: 'Register Successful!', // required
        preset: 'custom',
        duration: 2,
        icon: {
          ios: { name: 'person.fill', color: COLORS.magenta[500] },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    signin,
    signout,
    register,
    user,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
