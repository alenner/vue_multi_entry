module.exports = {
  root: true,
  env: {
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      // 非 react 项目关闭 jsx 语法校验,默认为 true
      jsx: false
    }
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', 'plugin:@typescript-eslint/recommended', './.eslintrc-auto-import.json'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-bitwise': 'off',
    'no-tabs': 'off',
    'array-element-newline': ['error', 'consistent'],
    indent: ['error', 2, { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', 200],
    'no-new': 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'eol-last': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'warn',
    'import/no-cycle': 'off',
    'arrow-parens': 'off',
    semi: ['error', 'never'],
    eqeqeq: 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-continue': 'off',
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'prefer-const': 'off',
    'global-require': 'off',
    'no-prototype-builtins': 'off',
    'consistent-return': 'off',
    'vue/require-component-is': 'off',
    'vue/multi-word-component-names': 'off',
    'prefer-template': 'off',
    'one-var-declaration-per-line': 'off',
    'one-var': 'off',
    'import/named': 'off',
    'object-curly-newline': 'off',
    'default-case': 'off',
    'import/order': 'off',
    'no-trailing-spaces': 'off',
    'func-names': 'off',
    'no-fallthrough': ['error', { allowEmptyCase: true }],
    camelcase: 'off',
    radix: 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': 'off',
    'no-mixed-operators': 'off',
    'no-await-in-loop': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-case-declarations': 'off',
    'template-curly-spacing': 'off',
    'space-before-function-paren': 'off',
    'vue/valid-v-for': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'guard-for-in': 'off',
    '@typescript-eslint/ban-types': 'off',
    'class-methods-use-this': 'off',
    'no-return-await': 'off',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
