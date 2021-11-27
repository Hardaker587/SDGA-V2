<template>
  <baseLayout>
    <div class="body-container p-2">
      <slot />
    </div>
  </baseLayout>
</template>

<script>
import baseLayout from '@/components/layouts/common/layouts-common-base.vue'
export default {
  name: 'default',
  components: { baseLayout },
}
</script>
