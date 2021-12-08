<template>
  <div>
    <commonLoader v-if="loading" :active="loading" />
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div class="card shadow-lg" @click="selectedAllData()">
        <div class="card-body text-center justify-center">
          <h2 class="card-title">All responses</h2>
        </div>
      </div>
      <div class="card shadow-lg" @click="initiateFetchGoals()">
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Goals</h2>
        </div>
      </div>
      <div class="card shadow-lg" @click="initiateFetchCategories()">
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Goal Categories</h2>
        </div>
      </div>
      <div class="card shadow-lg" @click="initiateFetchQuestions()">
        <div class="card-body text-center justify-center">
          <h2 class="card-title">Questions</h2>
        </div>
      </div>
    </div>
    <div
      v-if="selectingGoals || selectingCategories || selectingQuestions"
      :key="key"
    >
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
          <input
            v-if="selectingGoals && !selectingCategories"
            type="checkbox"
            class="mr-2"
            @input="selectGoal(goal.id)"
          />
          <img
            :src="`/images/goals/Goal_${goal.sortOrder}.svg`"
            class="h-10 w-auto mr-2"
            alt=""
          />
          <div class="flex-1">{{ goal.title }}</div>
          <ChevronDownIcon
            v-if="!selectingGoals || selectingCategories || selectingQuestions"
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5"
          />
        </DisclosureButton>
        <DisclosurePanel
          v-if="!selectingGoals || selectingCategories || selectingQuestions"
          class="px-4 pb-2"
        >
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
              <input
                v-if="selectingCategories && !selectingQuestions"
                type="checkbox"
                class="mr-2"
                @input="selectCategory(category.id)"
              />
              <div class="flex-1">{{ category.title }}</div>
              <ChevronDownIcon
                v-if="!selectingCategories || selectingQuestions"
                :class="open ? 'transform rotate-180' : ''"
                class="w-5 h-5"
              />
            </DisclosureButton>
            <DisclosurePanel
              v-if="!selectingCategories || selectingQuestions"
              class="px-4 pb-2"
            >
              <div
                v-for="question in filterQuestions(category.id)"
                :key="question.id"
                class="flex mb-4 items-center"
              >
                <input
                  type="checkbox"
                  class="mr-2"
                  @input="selectQuestion(question.id)"
                />
                {{ question.question }}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </DisclosurePanel>
      </Disclosure>
    </div>
    <div
      v-if="selectingGoals || selectingCategories || selectingQuestions"
      class="
        sticky
        bottom-0
        shadow-xl
        flex
        justify-between
        bg-white
        w-full
        z-50
        p-4
      "
    >
      <div>
        <h1 class="text-lg font-black">Selections</h1>
        <h1 class="text-md">
          Click proceed when you are ready to view your chart
        </h1>
      </div>
      <button
        class="bg-success p-4 text-white disabled:opacity-50"
        :class="!canSubmit ? 'opacity-50' : ''"
        @click="submitSelections()"
      >
        Proceed
      </button>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/vue/solid/esm'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'
import { uuid } from '../../../utilities/uuid'

export default {
  name: 'admin-reports-data-selector',
  data: () => ({
    //general
    loading: false,
    key: null,
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
  computed: {
    canSubmit() {
      return (
        !!this.selectedGoals.length ||
        !!this.selectedCategories ||
        !!this.selectingQuestions
      )
    },
  },
  methods: {
    selectedAllData() {
      // disable selections
      this.selectingGoals = false
      this.selectingCategories = false
      this.selectedQuestions = false
      // nullify selections
      this.goals = null
      this.categories = null
      this.questions = null
      // emit the event
      this.$emit('chart-all-responses')
    },
    initateFetches() {
      this.loading = !this.loading
      this.key = uuid()
      if (this.selectingGoals) {
        this.fetchGoals()
      }
      if (this.selectingCategories) {
        if (!this.goals) {
          this.fetchGoals()
        }
        this.fetchGoalCategories()
      }
      if (this.selectingQuestions) {
        if (!this.goals) {
          this.fetchGoals()
        }
        if (!this.categories) {
          this.fetchGoalCategories()
        }
        this.fetchQuestions()
      }
      this.loading = !this.loading
    },
    initiateFetchGoals() {
      this.loading = true
      this.selectingGoals = true
      this.selectingCategories = false
      this.selectingQuestions = false
      this.fetchGoals().then(() => {
        this.loading = false
      })
    },
    initiateFetchCategories() {
      this.loading = true
      this.selectingGoals = false
      this.selectingCategories = true
      this.selectingQuestions = false
      Promise.all([this.fetchGoals(), this.fetchGoalCategories()]).then(
        () => (this.loading = false)
      )
    },
    initiateFetchQuestions() {
      this.loading = true
      this.selectingGoals = false
      this.selectingCategories = false
      this.selectingQuestions = true
      Promise.all([
        this.fetchGoals(),
        this.fetchGoalCategories(),
        this.fetchQuestions(),
      ]).then(() => (this.loading = false))
    },
    // goals
    async fetchGoals() {
      await this.$firestore()
        .getAllDocuments('goals')
        .then((res) => {
          this.goals = res.sort((a, b) => a.sortOrder > b.sortOrder)
        })
    },
    selectGoal(goal) {
      if (this.selectedGoals.some((selectedGoal) => selectedGoal === goal)) {
        this.selectedGoals.splice(this.selectedGoals.indexOf(goal), 1)
      } else {
        this.selectedGoals.push(goal)
      }
    },
    // categories
    async fetchGoalCategories() {
      await this.$firestore()
        .getAllDocuments('categories')
        .then((res) => (this.categories = res))
    },
    filterGoalCategories(goal) {
      return this.categories.filter((category) => category.goal === goal)
    },
    selectCategory(category) {
      if (
        this.selectedCategories.some(
          (selectedCategory) => selectedCategory === category
        )
      ) {
        this.selectedCategories.splice(
          this.selectedCategories.indexOf(category),
          1
        )
      } else {
        this.selectedCategories.push(category)
      }
    },
    // questions
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
    selectQuestion(question) {
      if (
        this.selectedQuestions.some(
          (selectedQuestion) => selectedQuestion === question
        )
      ) {
        this.selectedQuestions.splice(
          this.selectedQuestions.indexOf(question),
          1
        )
      } else {
        this.selectedQuestions.push(question)
      }
    },
    //submit
    submitSelections() {
      if (!this.canSubmit) return
      if (this.selectingGoals) {
        this.$emit('chart-goals', this.selectedGoals)
      }
      if (this.selectingCategories) {
        this.$emit('chart-categories', this.selectedCategories)
      }
      if (this.selectingQuestions) {
        this.$emit('chart-questions', this.selectedQuestions)
      }
    },
  },
}
</script>
