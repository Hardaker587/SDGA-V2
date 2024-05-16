import { defineNuxtConfig } from 'nuxt/config'
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/base.styles.css'],
  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@artmizu/nuxt-prometheus'],
  tailwindcss: {
    config: {
      darkMode: 'class', // or 'media' or 'class'
      theme: {
        container: {
          center: true,
        },
      },
      plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('daisyui'),
      ],
      daisyui: {
        styled: true,
        themes: ['light'],
        base: false,
        utils: true,
        logs: true,
        rtl: false,
      },
    },
  },
})
