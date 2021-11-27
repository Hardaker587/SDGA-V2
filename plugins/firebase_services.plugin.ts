import { RealtimeDatabaseService } from '@/services/realtime-database.service'
import { AuthenticationService } from '@/services/authentication.service'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('database', () => {
    return new RealtimeDatabaseService()
  })
  nuxtApp.provide('auth', () => {
    return new AuthenticationService()
  })
})

declare module '#app' {
  interface NuxtApp {
    $database(): RealtimeDatabaseService
    $auth(): AuthenticationService
  }
}
