import { addCollection } from '@iconify/react'

export const setupIconify = async () => {
  const { icons: icIcons } = await import('@iconify-json/ic')
  addCollection(icIcons)

  const { icons: msIcons } = await import('@iconify-json/material-symbols')
  addCollection(msIcons)
}
