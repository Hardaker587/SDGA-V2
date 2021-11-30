import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

export const adminMiddleware = () => {
  const { $authStore } = useNuxtApp()
  const router = useRouter()
  const admin = $authStore().getclaims

  if (!admin?.admin) router.replace('/survey/1')
}
