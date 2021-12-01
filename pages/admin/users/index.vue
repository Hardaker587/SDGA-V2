<template>
  <div class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4 btn-sm md:btn-md"
        @click="$router.push('/admin')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <h1 class="text-lg md:text-2xl font-black">Users</h1>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'

export default {
  name: 'index',
  components: { ChevronLeftIcon },
}
</script>
