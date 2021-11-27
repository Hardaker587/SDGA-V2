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
    loading: true
  }),
  mounted() {
    this.goal()
  },
  methods: {
    async goal() {
      await this.$database()
        .findMany('goal', 'sortOrder', parseInt(this.$route.params.goal))
        .then((res) => {
          const id = Object.keys(res)[0]
          this.surveyGoal = {
            id,
            color: res[id].color,
            sortOrder: res[id].sortOrder,
            title: res[id].title,
          }
          this.category(id)
          this.question(id)
          this.loading = false
        })
        .catch((e) => console.error(e))
    },
    async category(key) {
      await this.$database()
        .findMany('goalCategory', 'goal', key)
        .then((res) => {
          this.surveyCategories = Object.keys(res).map(
            (categoryKey, currentIteration) => {
              return {
                id: categoryKey,
                ...res[categoryKey],
              }
            },
            []
          )
        })
        .catch((e) => console.error(e))
    },
    async question(key) {
      await this.$database()
        .findMany('survey', 'goal', key)
        .then((res) => {
          this.surveyQuestions = Object.keys(res).map(
            (categoryKey, currentIteration) => {
              return {
                id: categoryKey,
                ...res[categoryKey],
              }
            },
            []
          )
        })
        .catch((e) => console.error(e))
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
