<template>
  <div class="w-full px-4">
    <commonLoader v-if="loading" :active="loading" />
    <div class="flex">
      <button
        class="btn btn-circle mr-4"
        @click="$router.push('/admin/questions/')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <div class="flex items-center mb-4">
        <img
          class="goal_image mr-4 w-12"
          :src="`/images/goals/Goal_${goal?.sortOrder}.svg`"
          alt=""
        />
        <h1 class="text-2xl font-black">
          {{ goal?.title }}
        </h1>
      </div>
    </div>
    <div class="w-full p-2 mx-auto">
      <Disclosure
        v-for="category in categories"
        :key="category.id"
        v-slot="{ open }"
      >
        <DisclosureButton
          class="flex justify-between w-full p-4 font-medium text-left mb-4"
          :style="`background: ${goal?.color}`"
        >
          <span>{{ category.sortOrder }}. {{ category.title }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2">
          <div
            v-for="question in filterQuestions(category.id)"
            :key="question.id"
          >
            {{ question.sortOrder }}. {{ question.question }}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon, ChevronLeftIcon } from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    ChevronLeftIcon,
    commonLoader,
  },
  data: () => ({
    loading: true,
    goal: null,
    categories: null,
    questions: null,
  }),
  mounted() {
    if (!this.$route.query.goal) return this.$router.push('/admin/questions/')
    Promise.all([
      this.fetchGoal(),
      this.fetchCategories(this.$route.query.goal),
      this.fetchQuestions(this.$route.query.goal),
    ]).then(() => (this.loading = false))
  },
  methods: {
    async fetchGoal() {
      await this.$database()
        .findOne('goal', this.$route.query.goal)
        .then((res) => {
          this.goal = res
        })
        .catch((e) => console.error(e))
    },
    async fetchCategories(goalId) {
      await this.$database()
        .findMany('goalCategory', 'goal', goalId)
        .then((res) => {
          this.categories = Object.keys(res)
            .map((categoryKey, currentIteration) => {
              return {
                id: categoryKey,
                ...res[categoryKey],
              }
            }, [])
            .sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
    async fetchQuestions(goalId) {
      await this.$database()
        .findMany('survey', 'goal', goalId)
        .then((res) => {
          this.questions = Object.keys(res)
            .map((categoryKey, currentIteration) => {
              return {
                id: categoryKey,
                ...res[categoryKey],
              }
            }, [])
            .sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },

    filterQuestions(categoryId) {
      return this.questions.filter(
        (question) => question.goalCategory === categoryId
      )
    },
  },
}
</script>
