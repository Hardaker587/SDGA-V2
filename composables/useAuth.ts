import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

export const authMiddleware = async () => {
  const { $auth } = useNuxtApp()
  const router = useRouter()
  console.log('service', $auth().isLoggedIn())
  await $auth()
    .isLoggedIn()
    .then(async (loggedIn) => {
      console.log('am i logged in', loggedIn)
      if (!loggedIn) {
        await router.push('/account/login')
      }
    })
}
