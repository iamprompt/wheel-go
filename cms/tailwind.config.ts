import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const fontWeightMap: Record<string, string> = {
  xbold: '900',
  bold: '700',
  semibold: '600',
  medium: '500',
  regular: '400',
  light: '300',
  thin: '200',
}

const getFontStyle = (
  name: string,
  size: number,
  weight: string,
  lineHeight?: number,
) => {
  return {
    [name]: [
      `${size}px`,
      {
        lineHeight: lineHeight ? `${lineHeight}px` : undefined,
        fontWeight: fontWeightMap[weight] || '400',
      },
    ],
  }
}

const getFontPresets = (styles: [string, number, string, number?][] = []) => {
  return styles.reduce((acc, style) => {
    return {
      ...acc,
      ...getFontStyle(style[0], style[1], style[2], style[3]),
    }
  }, {})
}

const config: Config = {
  content: [`./src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    fontFamily: {
      sans: [
        'LINE Seed Sans TH',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen-Sans',
        'Ubuntu',
        'Cantarell',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        // Base colors
        'black-pepper': {
          100: '#787878',
          200: '#616161',
          300: '#494949',
          400: '#333333',
          500: '#1E1E1E',
          600: '#000000',
        },
        'french-vanilla': {
          100: '#FFFFFF',
          200: '#EBEBEB',
          300: '#D4D4D4',
          400: '#BDBDBD',
          500: '#A6A6A6',
          600: '#8F8F8F',
        },
        licorie: {
          100: '#A1AAB3',
          200: '#7B858F',
          300: '#5E6A75',
          400: '#4A5561',
          500: '#333D47',
          600: '#1F262E',
        },
        soap: {
          100: '#F6F7F8',
          200: '#F0F1F2',
          300: '#E8EBED',
          400: '#DFE2E6',
          500: '#CED3D9',
          600: '#B9C0C7',
        },
        // Theme colors
        magenta: {
          100: '#F2E1FF',
          200: '#BE71FC',
          300: '#AC44FF',
          400: '#8D28DD',
          500: '#6A11B1',
          600: '#1B052F',
        },
        blue: {
          100: '#D1D2FF',
          200: '#9A9CFC',
          300: '#888AF8',
          400: '#7375E8',
          500: '#5E60C6',
          600: '#2A2C6C',
        },
        cyan: {
          100: '#CEF6FE',
          200: '#ADF4FF',
          300: '#9CE6F4',
          400: '#87DDEE',
          500: '#78CCDD',
          600: '#3CB5C9',
        },
        mint: {
          100: '#E3FFFB',
          200: '#D5FCF6',
          300: '#B7FFF3',
          400: '#A1F8EA',
          500: '#93EBDD',
          600: '#55D3BF',
        },
        'light-mint': {
          100: '#EBFFF8',
          200: '#E1FFF5',
          300: '#CDFEED',
          400: '#B4FFE5',
          500: '#A1FCDD',
          600: '#66FFCB',
        },
        // Semantic colors
        error: {
          100: '#FFEFEE',
          200: '#FCC9C5',
          300: '#FF867D',
          400: '#FF5347',
          500: '#DE2E21',
          600: '#A31B12',
        },
        info: {
          100: '#F1F6FF',
          200: '#E0EAFF',
          300: '#7EA5F8',
          400: '#4D82F3',
          500: '#2563EB',
          600: '#0037B3',
        },
        warning: {
          100: '#FFF9E6',
          200: '#FFECAB',
          300: '#FFDA61',
          400: '#FFC629',
          500: '#EBB400',
          600: '#BD9100',
        },
        success: {
          100: '#EBFFF0',
          200: '#ACF5BE',
          300: '#5FE380',
          400: '#43C463',
          500: '#319C4C',
          600: '#217A37',
        },
        // Decorative colors
        pomegranate: {
          100: '#FFEBF3',
          200: '#FFBDD6',
          300: '#FF5C9A',
          400: '#F31167',
          500: '#C70550',
          600: '#99003A',
        },
        'fruit-punch': {
          100: '#FFEEEE',
          200: '#FFBDBD',
          300: '#FF7E7E',
          400: '#FF4C4C',
          500: '#E12F2F',
          600: '#B82828',
        },
        cantaloupe: {
          100: '#FFEED9',
          200: '#FCD49F',
          300: '#FFBC63',
          400: '#FFA126',
          500: '#F38B00',
          600: '#C06C00',
        },
        lime: {
          100: '#F9FFEA',
          200: '#D8EE9B',
          300: '#C7F24F',
          400: '#97B544',
          500: '#638404',
          600: '#354800',
        },
        kiwi: {
          100: '#ECFCD7',
          200: '#CAF593',
          300: '#A7E05C',
          400: '#77BC1F',
          500: '#609915',
          600: '#537824',
        },
        jewel: {
          100: '#EBFDFF',
          200: '#ACECF3',
          300: '#44C8D7',
          400: '#1EA4B3',
          500: '#1A818C',
          600: '#156973',
        },
        indigo: {
          100: '#EDECFF',
          200: '#B0A9FF',
          300: '#8B81FD',
          400: '#7A6DFF',
          500: '#4032DC',
          600: '#0A0075',
        },
        grape: {
          100: '#FEEBFF',
          200: '#FAC0FF',
          300: '#DE8AE6',
          400: '#C860D1',
          500: '#97499E',
          600: '#7C3882',
        },
        'root-beer': {
          100: '#FAF3F0',
          200: '#EBD7CF',
          300: '#DCBBAD',
          400: '#BA9A8C',
          500: '#8C7266',
          600: '#664D42',
        },
        toast: {
          100: '#FDF6E6',
          200: '#EBD6A9',
          300: '#E6BF6C',
          400: '#CC9E3B',
          500: '#B37F10',
          600: '#8C6000',
        },
        organization: {
          'ict-veridian': '#006C6C',
          'ict-cream': '#FFFFC9',
          'mu-blue': '#32528E',
          'mu-crown': '#F8C242',
          'mu-shield': '#A6853E',
        },
      },
      backgroundImage: {
        'gradient-1':
          'linear-gradient(101.11deg, #6A11B1 -11.34%, #78CCDD 106.27%);',
        'gradient-2':
          'linear-gradient(101.11deg, #1B052F -11.34%, #3CB5C9 106.27%);',
        'gradient-3':
          'linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 92.2%);',
      },
      borderRadius: {
        zero: '0',
        s: '6px',
        m: '12px',
        l: '24px',
        circle: '1000px',
      },
      spacing: {
        zero: '0px',
        xxxs: '4px',
        xxs: '8px',
        xs: '12px',
        s: '16px',
        m: '24px',
        l: '32px',
        xl: '40px',
        xxl: '64px',
        xxxl: '80px',
      },
      boxShadow: {
        1: '0px 0px 4px rgba(0, 0, 0, 0.12)',
        2: '0px 0px 8px 1px rgba(0, 0, 0, 0.16)',
        3: '0px 0px 12px 2px rgba(0, 0, 0, 0.18)',
        4: '0px 0px 24px 4px rgba(0, 0, 0, 0.2)',
        5: '0px 0px 32px 8px rgba(0, 0, 0, 0.22)',
        6: '0px 0px 40px 12px rgba(0, 0, 0, 0.24)',
      },
      fontSize: {
        ...getFontPresets([
          ['title-xxl', 32, 'bold'],
          ['title-xl', 24, 'bold'],
          ['title-l', 20, 'bold'],
          ['title-m', 18, 'bold'],
          ['title-s', 16, 'bold'],
          ['title-xs', 14, 'bold'],
          ['title-xxs', 12, 'bold'],
          ['body-xxl', 24, 'regular'],
          ['body-xl', 20, 'regular'],
          ['body-l', 16, 'regular'],
          ['body-m', 14, 'regular'],
          ['body-s', 12, 'regular'],
          ['subtext-l', 14, 'regular'],
          ['subtext-m', 12, 'regular'],
          ['subtext-s', 10, 'regular'],
        ]),
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-all': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-y': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-x': {
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
} satisfies Config

export default config
