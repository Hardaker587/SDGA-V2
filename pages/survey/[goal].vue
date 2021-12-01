<script setup>
await authMiddleware()
</script>
<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="md:w-8/12 mx-auto bg-white md:shadow-lg pb-2">
    <div
      class="
        flex flex-col
        md:flex-row
        items-center
        justify-space-between
        p-2
        md:py-4
        mb-4
        sticky
        align-self
        top-16
        text-white
      "
      :style="`background-color: ${surveyGoal?.color}`"
    >
      <div class="flex flex-1 items-center">
        <img
          class="goal_image mr-4"
          :src="`/images/goals/Goal_${$route.params.goal}.svg`"
          alt=""
        />
        <h1 class="md:text-xl font-black">
          {{ surveyGoal?.title }}
        </h1>
      </div>
      <div class="flex">
        <div
          class="btn btn-primary mr-4 btn-sm md:btn-md"
          v-if="$route.params.goal !== '1'"
          @click="$router.push(`/survey/${--$route.params.goal}`)"
        >
          Previous
        </div>
        <div
          class="btn btn-primary btn-sm md:btn-md"
          v-if="$route.params.goal !== '16'"
          @click="$router.replace({ path: `/survey/${++$route.params.goal}` })"
        >
          Next
        </div>
      </div>
    </div>
    <div
      v-for="surveyCategory in surveyCategories"
      :key="surveyCategory.id"
      class="px-4"
    >
      <div class="text-lg font-bold underline mb-4">
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
          // basically guaranteed this will always have 1 result
          const topResult = res[0]
          this.surveyGoal = topResult
          await this.categories(topResult.id).then((res) => {
            this.surveyCategories = res.sort(
              (a, b) => a.sortOrder > b.sortOrder
            )
          })
          await this.questions(topResult.id).then((res) => {
            this.surveyQuestions = res.sort((a, b) => a.sortOrder > b.sortOrder)
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
