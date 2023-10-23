import lvjiaxuan from '@lvjiaxuan/eslint-plugin/flat'

export default [
  ...lvjiaxuan.configs.recommended,

  {
    files: [ 'test/**/*.ts' ],
    languageOptions: { parserOptions: { project: './tsconfig.json' } },
  },

  { rules: { '@typescript-eslint/consistent-type-definitions': 'off' } },
]
