import { survey_store } from '@/stores/survey'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('surveyStore', () => {
    return survey_store()
  })
})

declare module '#app' {
  interface NuxtApp {
    $surveyStore(): survey_store
  }
}
