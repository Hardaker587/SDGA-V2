import { RealtimeDatabaseService } from '@/services/realtime-database.service'
import { AuthenticationService } from '@/services/authentication.service'
import { FirestoreService } from '@/services/firestore.service'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('database', () => {
    return new RealtimeDatabaseService()
  })
  nuxtApp.provide('auth', () => {
    return new AuthenticationService()
  })
  nuxtApp.provide('firestore', () => {
    return new FirestoreService()
  })
})

declare module '#app' {
  interface NuxtApp {
    $database(): RealtimeDatabaseService
    $auth(): AuthenticationService
    $firestore(): FirestoreService
  }
}
