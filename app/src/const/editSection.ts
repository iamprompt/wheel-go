interface EditItem {
  name: string
  label: string
  key: string
  href?: string
  editable?: boolean
  showValue?: boolean
  i18nPrefix?: string
}

interface EditSection {
  name: string
  label: string
  items: EditItem[]
}

export const ProfileEditSection: EditSection[] = [
  {
    name: 'basic_info',
    label: 'profile.edit.basic_info',
    items: [
      {
        name: 'username',
        label: 'profile.edit.username',
        key: 'username',
      },
      {
        name: 'impairment_level',
        label: 'profile.edit.impairment_level',
        key: 'impairmentLevel',
        editable: false,
        href: '/impairment',
        i18nPrefix: 'impairment_level.',
      },
      {
        name: 'equipment',
        label: 'profile.edit.equipment',
        key: 'equipment',
        editable: false,
        href: '/equipment',
        i18nPrefix: 'equipment.',
      },
      {
        name: 'firstname',
        label: 'profile.edit.firstname',
        key: 'firstname',
      },
      {
        name: 'lastname',
        label: 'profile.edit.lastname',
        key: 'lastname',
      },
      // {
      //   name: 'birthdate',
      //   label: 'profile.edit.birthdate',
      //   key: 'birthdate',
      // },
    ],
  },
  {
    name: 'account',
    label: 'profile.edit.account',
    items: [
      {
        name: 'email',
        label: 'profile.edit.email',
        key: 'email',
        editable: false,
      },
    ],
  },
]
