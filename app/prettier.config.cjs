/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  arrowParens: 'always',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(expo/(.*)$)|^(expo$)|^(expo(.*)$)',
    '^(react/(.*)$)|^(react(.*)$)|^(react$)|^(react-native(.*)$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/utils/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderParserPlugins: ['typescript', 'jsx'],
}

module.exports = config
