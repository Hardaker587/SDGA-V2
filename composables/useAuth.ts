import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

export const authMiddleware = async () => {
  const { $auth } = useNuxtApp()
  const router = useRouter()

  const loggedIn = await $auth().isLoggedIn()
  if (!loggedIn) {
    await router.push('/account/login')
  }
}
