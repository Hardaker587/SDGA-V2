<template>
  <div class="w-full bg-gray-50">
    <commonHeader />
    <slot />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
const { $auth } = useNuxtApp()
onBeforeMount(() => {
  $auth().isLoggedIn()
  $auth().user()
  $auth().returnClaims()
})
</script>

<script>
import commonHeader from '@/components/layouts/common/layouts-common-header.vue'
export default {
  name: 'base-layout',
  components: { commonHeader },
  props: {
    displayHeader: { type: Boolean, required: false, default: true },
    displayFooter: { type: Boolean, required: false, default: true },
  },
}
</script>
