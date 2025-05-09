// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [// "@unocss/nuxt",
  'v-gsap-nuxt', '@sidebase/nuxt-auth', '@vueuse/nuxt', '@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxthub/core', '@nuxtjs/i18n'],
  runtimeConfig: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    public: {
      firebase: process.env.FIREBASE_SERVICE_ACCOUNT,
      GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    },
  },
  hub: {
    remote: true,
    database: true,
  },
  googleFonts: {
    families: {
      'EB Garamond': true,
    },
    preload: true,
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
    ],
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