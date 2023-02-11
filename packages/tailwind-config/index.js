const plugin = require('tailwindcss/plugin')

const fontWeightMap = {
  xbold: '900',
  bold: '700',
  semibold: '600',
  medium: '500',
  regular: '400',
  light: '300',
  thin: '200',
}

const getFontStyle = (name, size, weight, lineHeight) => {
  return {
    [name]: [
      `${size}px`,
      {
        lineHeight: lineHeight ? `${lineHeight}px` : 'normal',
        fontWeight: fontWeightMap[weight] || '400',
      },
    ],
  }
}

const getFontPresets = (styles = []) => {
  return styles.reduce((acc, style) => {
    return {
      ...acc,
      ...getFontStyle(style[0], style[1], style[2], style[3]),
    }
  }, {})
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // app content
    `./src/**/*.{js,ts,jsx,tsx}`,
    `./index.html`,
    // include packages if not transpiling
    // '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  fontFamily: {
    sans: '"LINE Seed Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",sans-serif',
  },
  theme: {
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
        100: '#CDF1FF',
        200: '#ABE7FF',
        300: '#9AE1FD',
        400: '#7DD4F6',
        500: '#6BBEDF',
        600: '#4798B8',
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
        100: '#D3E1FE',
        200: '#95B7FE',
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
        100: '#FFEFEE',
        200: '#FCC9C5',
        300: '#FF867D',
        400: '#FF5347',
        500: '#DE2E21',
        600: '#99003A',
      },
    },
    borderRadius: {
      zero: '0',
      s: '6px',
      m: '12px',
      l: '24px',
      circle: '1000px',
    },
    extend: {
      fontSize: {
        ...getFontPresets([
          ['title-xl', 24, 'bold'],
          ['title-l', 20, 'bold'],
          ['title-m', 18, 'bold'],
          ['title-s', 16, 'bold'],
          ['title-xs', 14, 'bold'],
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
          paddingTop: 'env(safe-area-inset-top, 16px)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        },
        '.safe-all': {
          paddingTop: 'env(safe-area-inset-top, 16px)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        },
        '.safe-y': {
          paddingTop: 'env(safe-area-inset-top, 16px)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        },
        '.safe-x': {
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}
