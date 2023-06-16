import { createIconSet } from '@expo/vector-icons'

import { GlyphMaps } from './GlyphMaps'

export const MaterialIcons = createIconSet(
  GlyphMaps,
  'MaterialIcons',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./MaterialIconsRound-Regular.otf'),
)
