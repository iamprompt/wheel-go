import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'

// Must be exported or Fast Refresh won't update the context
export function App() {
  // @ts-expect-error - Require context is not typed
  const ctx = require.context('./src/app')
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
