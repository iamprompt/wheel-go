import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '@/styles/globals.css'
import '@wheel-go/ui/styles.css'

import '@/utils/i18n'
import '@/utils/dayjs'
import { setupIconify } from './utils/icons'

setupIconify()

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
