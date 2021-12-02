<template>
  <div>
    <commonLoader v-if="loading" :active="loading" />
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div class="card shadow-lg" @click="$emit('chart-all-responses')">
        <div class="card-body text-center justify-center">
          <h2 class="card-title">All responses</h2>
        </div>
      </div>
      <div
        class="card shadow-lg"
        @click=";[(this.selectingGoals = true), initateFetches()]"
      >
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Goals</h2>
        </div>
      </div>
      <div
        class="card shadow-lg"
        @click=";[(this.selectingCategories = true), initateFetches()]"
      >
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Goal Categories</h2>
        </div>
      </div>
      <div
        class="card shadow-lg"
        @click=";[(this.selectingQuestions = true), initateFetches()]"
      >
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Questions</h2>
        </div>
      </div>
    </div>
    <div v-if="selectingGoals || selectingCategories || selectingQuestions">
      <Disclosure v-for="goal in goals" :key="goal.id" v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            items-center
            w-full
            p-4
            font-medium
            text-left
            mb-2
            text-white
            bg-gray-700
          "
        >
          <input v-if="selectingGoals" type="checkbox" class="mr-2" />
          <img
            :src="`/images/goals/Goal_${goal.sortOrder}.svg`"
            class="h-10 w-auto mr-2"
            alt=""
          />
          <div class="flex-1">{{ goal.title }}</div>
          <ChevronDownIcon
            v-if="!selectingGoals"
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5"
          />
        </DisclosureButton>
        <DisclosurePanel v-if="!selectingGoals" class="px-4 pb-2">
          <Disclosure
            v-for="category in filterGoalCategories(goal.id)"
            :key="category.id"
            v-slot="{ open }"
          >
            <DisclosureButton
              class="
                flex
                justify-between
                items-center
                w-full
                p-4
                font-medium
                text-left
                mb-2
                text-white
                bg-gray-700
              "
            >
              <input v-if="selectingCategories" type="checkbox" class="mr-2" />
              <div class="flex-1">{{ category.title }}</div>
              <ChevronDownIcon
                v-if="!selectingCategories"
                :class="open ? 'transform rotate-180' : ''"
                class="w-5 h-5"
              />
            </DisclosureButton>
            <DisclosurePanel v-if="!selectingCategories" class="px-4 pb-2">
              <div
                v-for="question in filterQuestions(category.id)"
                :key="question.id"
                class="flex mb-4 items-center"
              >
                <input type="checkbox" class="mr-2" />
                {{ question.question }}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/vue/solid/esm'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  name: 'admin-reports-data-selector',
  data: () => ({
    //general
    loading: false,
    // renders
    selectingGoals: false,
    selectingCategories: false,
    selectingQuestions: false,
    // data
    goals: null,
    categories: null,
    questions: null,
    //selections
    selectedGoals: [],
    selectedCategories: [],
    selectedQuestions: [],
  }),
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
    ChevronLeftIcon,
    commonLoader,
  },
  methods: {
    initateFetches() {
      this.loading = true
      if (this.selectingGoals) {
        this.selectingCategories = false
        this.selectingQuestions = false
        this.fetchGoals()
      }
      if (this.selectingCategories) {
        this.selectingGoals = false
        this.selectingQuestions = false
        this.fetchGoals()
        this.fetchGoalCategories()
      }
      if (this.selectingQuestions) {
        this.selectingGoals = false
        this.selectingCategories = false
        this.fetchGoals()
        this.fetchGoalCategories()
        this.fetchQuestions()
      }
      this.loading = false
    },
    async fetchGoals() {
      await this.$firestore()
        .getAllDocuments('goals')
        .then((res) => (this.goals = res))
    },
    async fetchGoalCategories() {
      await this.$firestore()
        .getAllDocuments('categories')
        .then((res) => (this.categories = res))
    },
    filterGoalCategories(goal) {
      return this.categories.filter((category) => category.goal === goal)
    },
    async fetchQuestions() {
      await this.$firestore()
        .getAllDocuments('questions')
        .then((res) => (this.questions = res))
    },
    filterQuestions(category) {
      return this.questions.filter(
        (question) => question.goalCategory === category
      )
    },
  },
}
</script>
