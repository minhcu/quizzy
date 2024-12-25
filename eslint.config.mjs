import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue: true,
    typescript: true,
    jsonc: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',

      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',

      'regexp/no-unused-capturing-group': 'off',

      'ts/ban-ts-comment': 'off',
      'ts/no-empty-object-type': 'off',

      'vue/valid-v-slot': 'off',
      'vue/custom-event-name-casing': 'off',

      'vue/attributes-order': 'error',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  }),
  {
    ignores: [
      '**/coverage',
      '**/assets',
      '**/dist',
      '**/tmpl',
      '**/node_modules',
      '**/.nuxt',
      '**/.build',
      '**/.output',
      '**/.nuxtrc',
    ],
  },
)
