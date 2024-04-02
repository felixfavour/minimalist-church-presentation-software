import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  ssr: false,
  colorMode: {
    preference: 'light',
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
    plugins: [VitePWA({ registerType: 'autoUpdate' })]
  },
  pwa: {
    manifest: {
      name: "Cloud of Worshippers",
      short_name: 'clowd',
      theme_color: '#a855f7'
    }
  }
})
