// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: 'S-Group | Lắc Xì',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
    },
    pageTransition: {
      name: 'page-fade',
      mode: 'out-in',
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
      authDomain: process.env.NODE_ENV === 'production' ? 'lixi.sgroupvn.org' : process.env.FIRE_BASE_AUTHDOMAIN,
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
