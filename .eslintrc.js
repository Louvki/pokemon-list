module.exports = {

  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 0,
    'no-path-concat': 0,
    'no-unused-vars': 1,
    'semi': ['error', 'always'],
    'vue/html-quotes': ['error', 'double'],
    'vue/html-self-closing': 0,
    'vue/no-unused-components': 1,
    'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
    'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: { max: 1, allowFirstLine: false } }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/attribute-hyphenation': 0,
    'handle-callback-err': 0,
    'vue/no-v-html': 0,
    'nuxt/no-globals-in-created': 0,
    'vue/attributes-order': 0,
    'import/order': 0,
    'quote-props': ['error', 'consistent-as-needed'],
    'vue/html-indent': 0,
    'no-prototype-builtins': 1,
    'no-useless-escape': 0,
    'max-len': ['error', { code: 200 }],
    'no-param-reassign': 0,
    'no-nested-ternary': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
