<template>
  <div class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <div class="flex items-center flex-1">
        <button
          class="btn btn-circle mr-4 btn-sm md:btn-md"
          @click="$router.push('/admin/users')"
        >
          <ChevronLeftIcon class="w-8" />
        </button>
        <h1 class="text-lg md:text-2xl font-black">New User</h1>
      </div>

      <button
        class="btn btn-primary mr-2 btn-sm md:btn-md"
        @click="$router.replace('/account/login')"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  name: 'index',
  components: {
    ChevronLeftIcon,
    commonLoader,
  },
}
</script>

<style scoped></style>
