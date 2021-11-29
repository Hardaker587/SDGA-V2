<script setup>
await authMiddleware()
</script>
<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="p-4">
    <div class="flex items-center mb-4">
      <img
        class="goal_image mr-4"
        :src="`/images/goals/Goal_${$route.params.goal}.svg`"
        alt=""
      />
      <h1 class="text-2xl font-black mb-4">
        {{ surveyGoal?.title }}
      </h1>
      <div
        class="btn btn-primary"
        v-if="$route.params.goal !== '1'"
        @click="$router.push(`/survey/${--$route.params.goal}`)"
      >
        Previous
      </div>
      <div
        class="btn btn-primary"
        v-if="$route.params.goal !== '16'"
        @click="$router.replace({ path: `/survey/${++$route.params.goal}` })"
      >
        Next
      </div>
    </div>
    <div v-for="surveyCategory in surveyCategories" :key="surveyCategory.id">
      <div class="text-xl font-bold underline mb-4">
        {{ surveyCategory?.title }}
      </div>
      <surveyQuestion
        v-for="question in filterQuestions(surveyCategory.id)"
        :key="question.id"
        :goal="surveyGoal.id"
        :category="surveyCategory.id"
        :question="question.id"
        :title="question.question"
        :sortOrder="String(question.sortOrder)"
      />
    </div>
  </div>
</template>
<script>
import surveyQuestion from '@/components/survey/survey-question.vue'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'
export default {
  components: { surveyQuestion, commonLoader },
  name: '[goal]',
  data: () => ({
    surveyGoal: null,
    surveyCategories: null,
    surveyQuestions: null,
    loading: true,
  }),
  mounted() {
    this.initiatePage()
  },
  methods: {
    async initiatePage() {
      await this.goal()
        .then(async (res) => {
          // basically guarenteed this will always have 1 result
          const topResult = res[0]
          this.surveyGoal = topResult
          await this.categories(topResult.id).then((res) => {
            this.surveyCategories = res
          })
          await this.questions(topResult.id).then((res) => {
            this.surveyQuestions = res
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    async goal() {
      return await this.$firestore().queryDocuments('goals', {
        key: 'sortOrder',
        operator: '==',
        value: Number(this.$route.params.goal),
      })
    },
    async categories(goalId) {
      return await this.$firestore().queryDocuments('categories', {
        key: 'goal',
        operator: '==',
        value: goalId,
      })
    },
    async questions(goalId) {
      return await this.$firestore().queryDocuments('questions', {
        key: 'goal',
        operator: '==',
        value: goalId,
      })
    },
    filterQuestions(id) {
      return this.surveyQuestions?.filter(
        (question) => question.goalCategory === id
      )
    },
  },
}
</script>

<style scoped>
.goal_image {
  max-width: 50px;
  max-height: 50px;
}
</style>
