import { addCollection } from '@iconify/react'

export const setupIconify = async () => {
  const { icons } = await import('@iconify-json/ic')
  addCollection(icons)
}
