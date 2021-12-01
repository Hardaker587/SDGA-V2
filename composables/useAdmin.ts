import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

export const adminMiddleware = async () => {
  const { $authStore } = useNuxtApp()
  const router = useRouter()
  const admin = $authStore().getclaims

  if (!admin?.admin) {
    await router.isReady().finally(() => {
      router.push('/account/login')
    })
  }
}
