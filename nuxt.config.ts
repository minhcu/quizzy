// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  routeRules: {
    '/lac-xi': {
      ssr: false,
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-vuefire',
    '@nuxt/eslint',
    '@nuxt/icon',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances: 3,
        timeoutSeconds: 30,
      },
      nodeVersion: '22',
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.FIRE_BASE_APIKEY,
      authDomain: process.env.FIRE_BASE_AUTHDOMAIN,
      projectId: process.env.FIRE_BASE_PROJECTID,
      storageBucket: process.env.FIRE_BASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIRE_BASE_MESSAGINGSENDERID,
      appId: process.env.FIRE_BASE_APPID,
    },
  },

  pinia: {
    storesDirs: ['./stores'],
  },
})
