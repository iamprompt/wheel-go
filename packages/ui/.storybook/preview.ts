import '../src/styles/styles.css'
import '../src/styles/fonts.css'

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}