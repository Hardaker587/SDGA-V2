<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="md:w-8/12 mx-auto md:px-4">
    <div class="flex items-center my-4">
      <button
        class="btn btn-circle btn-sm md:btn-md mr-2"
        @click="$router.push('/admin/questions/')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <div class="flex items-center">
        <img
          class="goal_image mr-4 w-12"
          :src="`/images/goals/Goal_${goal?.sortOrder}.svg`"
          alt=""
        />
        <h1 class="text-lg md:text-2xl font-black">
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
          class="
            flex
            justify-between
            w-full
            p-4
            font-medium
            text-left
            mb-2
            text-white
            items-center
          "
          :style="`background: ${goal?.color}`"
        >
          <div class="flex-1">
            {{ category.sortOrder }}. {{ category.title }}
          </div>
          <div
            class="rounded-full p-1 w-8 h-8 bg-black bg-opacity-50 text-center mr-4"
          >
            {{ filterQuestions(category.id).length }}
          </div>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pb-2">
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
    this.initiatePage()
  },
  methods: {
    async initiatePage() {
      Promise.all([
        this.fetchGoal(),
        this.fetchCategories(this.$route.query.goal),
        this.fetchQuestions(this.$route.query.goal),
      ]).then(() => (this.loading = false))
    },
    async fetchGoal() {
      await this.$firestore()
        .getOneDocument('goals', this.$route.query.goal)
        .then((res) => (this.goal = res))
    },
    async fetchCategories(goalId) {
      console.log('categories')
      await this.$firestore()
        .queryDocuments('categories', {
          key: 'goal',
          operator: '==',
          value: goalId,
        })
        .then((res) => {
          this.categories = res.sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
    async fetchQuestions(goalId) {
      console.log('questions')
      await this.$firestore()
        .queryDocuments('questions', {
          key: 'goal',
          operator: '==',
          value: goalId,
        })
        .then((res) => {
          this.questions = res.sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
    filterQuestions(id) {
      return this.questions?.filter((question) => question.goalCategory === id)
    },
  },
}
</script>
