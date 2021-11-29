import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

export const authMiddleware = async () => {
  const { $auth } = useNuxtApp()
  const router = useRouter()
  await $auth()
    .isLoggedIn()
    .then(async (loggedIn) => {
      if (!loggedIn) {
        await router.push('/account/login')
      }
    })
}
