import type { StoreonModule } from 'storeon'

interface Register {
  [key: string]: string | undefined
  firstname: string
  lastname: string
  email: string
  username: string
  password: string
  passwordConfirmation: string
  impairmentLevel: string
  equipment: string
}

export interface RegisterState {
  register: Register
}

export interface RegisterEvent {
  'register/setProfile': Register
  'register/setField': Partial<Register>
  'register/reset': undefined
}

export const registerModule: StoreonModule<RegisterState, RegisterEvent> = (
  store,
) => {
  store.on('@init', () => undefined)

  store.on('register/setProfile', (_, profile) => ({
    register: profile,
  }))

  store.on('register/setField', (state, profile) => ({
    register: {
      ...state.register,
      ...profile,
    },
  }))

  store.on('register/reset', () => ({
    register: undefined,
  }))
}
