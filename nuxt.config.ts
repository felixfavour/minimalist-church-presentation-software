export default defineNuxtConfig({
  experimental: {
    renderJsonPayloads: false
  },
  app: {
    head: {
      link: [
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
        {
          rel: 'preconnect',
          crossorigin: 'anonymous',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          crossorigin: 'anonymous',
          href: 'https://fonts.gstatic.com'
        },
        {
          rel: 'stylesheet',
          crossorigin: 'anonymous',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..600&display=swap'
        }
      ]
    }
  },
  ssr: false,
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
  }
})
