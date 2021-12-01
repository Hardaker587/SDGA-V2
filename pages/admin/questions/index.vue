<template>
  <div
    :style="`background: ${currentColor}; transition: ease all 0.9s`"
    class="p-4 rounded-box ease-in-out"
  >
    <div class="flex items-center mb-4">
      <button class="btn btn-circle mr-4" @click="$router.push('/admin')">
        <ChevronLeftIcon class="w-8" />
      </button>
      <h1 class="text-2xl font-black">Select a goal to proceed:</h1>
    </div>
    <div v-if="goals" class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
      <div v-for="goal in goals" :key="goal.id">
        <img
          :src="`/images/goals/Goal_${goal.sortOrder}.svg`"
          alt=""
          class="w-full h-auto hover:opacity-75"
          @click="$router.push(`/admin/questions/manage?goal=${goal.id}`)"
          @mouseover="currentColor = goal.color"
          @mouseout="currentColor = '#fff'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'

export default {
  components: { ChevronLeftIcon },
  data: () => ({
    goals: null,
    currentColor: '#fff',
  }),
  mounted() {
    this.fetchGoals()
  },
  methods: {
    async fetchGoals() {
      await this.$firestore()
        .getAllDocuments('goals')
        .then((res) => {
          this.goals = res.sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
  },
}
</script>
