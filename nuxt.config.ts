// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    // "@unocss/nuxt",
    'v-gsap-nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxthub/core',
  ],
  hub: {
    remote: true,
    database: true,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
    },
    supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
    databaseUrl: process.env.POSTGRES_PRISMA_URL,
    postgresUser: process.env.POSTGRES_USER,
  },
  googleFonts: {
    families: {
      'EB Garamond': true,
    },
    preload: true,
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    // baseURL: 'https://nas-tree.nuxt.dev/api/auth',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: '',
      addDefaultCallbackUrl: '/',
    },
    sessionRefresh: {
      enablePeriodically: 1000 * 60 * 60,
      enableOnWindowFocus: false,
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },
  nitro: {
    preset: 'cloudflare_pages',
    experimental: {
      websocket: true,
      openAPI: true,
    },
  },
  css: ['~/assets/styles.scss'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    },
  },
});
