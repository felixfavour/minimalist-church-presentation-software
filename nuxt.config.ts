import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  experimental: {
    renderJsonPayloads: false
  },
  app: {
    head: {
      link: [{
        rel: 'manifest',
        href: '/manifest.webmanifest'
      }]
    }
  },
  ssr: true,
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
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: '/',
        navigateFallbackAllowlist: [/^\/$/],
        type: 'module',
      }
    })]
  }
})
