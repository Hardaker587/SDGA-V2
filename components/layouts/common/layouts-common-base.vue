<template>
  <div class="w-full" data-theme="corporate">
    <commonHeader />
    <slot />
  </div>
</template>

<script>
import { general_store } from '@/stores/general'
import commonHeader from '@/components/layouts/common/layouts-common-header.vue'
import commonOverlay from '@/components/layouts/common/layouts-common-overlay.vue'
export default {
  name: 'base-layout',
  components: { commonHeader },
  props: {
    displayHeader: { type: Boolean, required: false, default: true },
    displayFooter: { type: Boolean, required: false, default: true },
  },
}
</script>
