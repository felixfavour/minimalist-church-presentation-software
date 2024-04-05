import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true
  },
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
      AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    }

  },
  // build: {
  //   transpile: ['workbox-build', 'nanoid', 'pretty-bytes'],
  // },
  modules: [
    '@nuxt/ui',
    'nuxt-tiptap-editor',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt'
  ],
  css: [
    '~/assets/css/main.css',
  ],
  ui: {
    global: true
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => false
    }
  },
  tiptap: {
    prefix: "Tiptap",
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  vite: {
    plugins: [VitePWA({
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: 'Cloud of Worshippers',
        short_name: 'clowd',
        description: 'Cloud of Worshippers',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/cloud-w-144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/cloud-w-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/cloud-w-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
        ]
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: '/',
        navigateFallbackAllowlist: [/^\/$/],
        type: 'module',
      },
      client: {
        installPrompt: true,
      },
    })]
  }
})
