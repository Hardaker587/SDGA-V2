<script setup>
await authMiddleware()
</script>
<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="p-4 md:w-8/12 mx-auto">
    <div>
      <h1 class="text-lg md:text-2xl font-black">Welcome to our survey</h1>
      <h1 class="text-md md:text-lg">Please select a goal to proceed</h1>
    </div>
    <div
      v-if="goals && questions"
      class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-8"
    >
      <div v-for="goal in goals" :key="goal.id" class="w-full indicator">
        <div
          class="indicator-item badge"
          :class="isGoalComplete(goal.id) ? 'bg-success' : 'bg-error'"
        >
          {{ isGoalComplete(goal.id) ? 'Complete' : 'Incomplete' }}
        </div>
        <img
          :src="`/images/goals/Goal_${goal.sortOrder}.svg`"
          alt=""
          class="w-full h-auto hover:opacity-75 rounded-box"
          @click="$router.push(`/survey/${goal.sortOrder}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronUpIcon } from '@heroicons/vue/solid/esm'

export default {
  data: () => ({
    loading: true,
    goals: null,
    questions: null,
  }),
  components: {
    commonLoader,
  },
  mounted() {
    this.fetchGoals()
    this.fetchQuestions()
  },
  methods: {
    async fetchGoals() {
      await this.$firestore()
        .getAllDocuments('goals')
        .then((res) => {
          this.goals = res.sort((a, b) => a.sortOrder - b.sortOrder)
        })
        .finally(() => (this.loading = false))
    },
    async fetchQuestions() {
      await this.$firestore()
        .getAllDocuments('questions')
        .then((res) => {
          this.questions = res
        })
        .finally(() => (this.loading = false))
    },
    isGoalComplete(goalId) {
      const responsesInStore =
        this.$surveyStore().get_survey_user_selections.filter(
          (response) => response.goalId === goalId
        )
      const goalQuestions = this.questions.filter(
        (question) => question.goal === goalId
      )
      return responsesInStore.length === goalQuestions.length
    },
  },
}
</script>

<style scoped></style>
