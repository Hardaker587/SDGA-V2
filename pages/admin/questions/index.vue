<template>
  <div>
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4"
        @click="$router.push('/admin')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <h1 class="text-2xl font-black">Select a goal to proceed:</h1>
    </div>
    <div v-if="goals" class="grid grid-cols-6 gap-4">
      <div v-for="goal in goals" :key="goal.id">
        <img
          :src="`/images/goals/Goal_${goal.sortOrder}.svg`"
          alt=""
          class="w-full h-auto hover:opacity-25"
          @click="$router.push(`/admin/questions/manage?goal=${goal.id}`)"
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
  }),
  mounted() {
    this.fetchGoals()
  },
  methods: {
    async fetchGoals() {
      await this.$database()
        .findAll('goal')
        .then((res) => {
          this.goals = Object.keys(res)
            .map((categoryKey, currentIteration) => {
              return {
                id: categoryKey,
                ...res[categoryKey],
              }
            }, [])
            .sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
  },
}
</script>
