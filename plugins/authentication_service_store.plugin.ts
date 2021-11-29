import { auth_store } from '@/stores/auth'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('authStore', () => {
    return auth_store()
  })
})

declare module '#app' {
  interface NuxtApp {
    $authStore(): auth_store
  }
}
