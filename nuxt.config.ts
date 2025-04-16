// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [// "@unocss/nuxt",
  'v-gsap-nuxt', '@sidebase/nuxt-auth', '@vueuse/nuxt', '@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxthub/core'],
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
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.BASE_URL ? `https://${process.env.BASE_URL}/api/auth` : undefined,
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: '',
      addDefaultCallbackUrl: '/',
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },
  nitro: {
    experimental: {
      websocket: true,
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