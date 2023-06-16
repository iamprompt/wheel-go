import type { StoreonModule } from 'storeon'

interface Profile {
  [key: string]: string | undefined
  firstname: string
  lastname: string
  email: string
  username: string
  impairmentLevel: string
  equipment: string
  profileImage: string
}

export interface ProfileEditState {
  profileEdit: Profile
}

export interface ProfileEditEvent {
  'profileEdit/setProfile': Profile
  'profileEdit/setField': Partial<Profile>
  'profileEdit/reset': undefined
}

export const profileEditModule: StoreonModule<
  ProfileEditState,
  ProfileEditEvent
> = (store) => {
  store.on('@init', () => undefined)

  store.on('profileEdit/setProfile', (_, profile) => ({
    profileEdit: profile,
  }))

  store.on('profileEdit/setField', (state, profile) => ({
    profileEdit: {
      ...state.profileEdit,
      ...profile,
    },
  }))

  store.on('profileEdit/reset', () => ({
    profileEdit: undefined,
  }))
}
