import lvjiaxuan from '@lvjiaxuan/eslint-plugin/flat'

export default [
  { ignores: [ 'test/**' ] },

  ...lvjiaxuan.configs.recommended,

  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },
]
