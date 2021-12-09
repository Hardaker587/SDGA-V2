<script setup>
await adminMiddleware()
</script>

<template>
  <div v-if="$authStore().getclaims?.admin" class="md:w-10/12 mx-auto">
    <h1 class="text-2xl font-black mb-4">General overview</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div class="card shadow-lg bg-gray-500 text-white">
        <div class="card-body">
          <h2 class="card-title">Total surveys completed</h2>
          <p>{{ responsesCount || 0 }}</p>
        </div>
      </div>
      <div class="card shadow-lg bg-gray-500 text-white">
        <div class="card-body">
          <h2 class="card-title">Surveys completed today</h2>
          <p>{{ todaysResponsesCount || 0 }}</p>
        </div>
      </div>
      <div class="card shadow-lg bg-gray-500 text-white">
        <div class="card-body">
          <h2 class="card-title">Total questions</h2>
          <p>{{ questionsCount || 0 }}</p>
        </div>
      </div>
      <div class="card shadow-lg bg-gray-500 text-white">
        <div class="card-body">
          <h2 class="card-title">Total users</h2>
          <p>{{ userCount || 0 }}</p>
        </div>
      </div>
    </div>
    <hr class="mb-4" />
    <h1 class="text-2xl font-black mb-4">Navigation</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div
        class="card shadow-lg bg-white hover:bg-blue-200"
        @click="$router.push('/admin/questions')"
      >
        <div class="card-body text-center">
          <QuestionMarkCircleIcon class="h-24 mb-4" />
          <h2 class="card-title">Manage Questions</h2>
        </div>
      </div>
      <div
        class="card shadow-lg bg-white hover:bg-blue-200"
        @click="$router.push('/admin/reports')"
      >
        <div class="card-body text-center">
          <DocumentReportIcon class="h-24 mb-4" />
          <h2 class="card-title">View Reports</h2>
        </div>
      </div>
      <div
        class="card shadow-lg bg-white hover:bg-blue-200"
        @click="$router.push('/admin/responses')"
      >
        <div class="card-body text-center">
          <AnnotationIcon class="h-24 mb-4" />
          <h2 class="card-title">View Responses</h2>
        </div>
      </div>
      <div
        class="card shadow-lg bg-white hover:bg-blue-200"
        @click="$router.push('/admin/users')"
      >
        <div class="card-body text-center">
          <UserCircleIcon class="h-24 mb-4" />
          <h2 class="card-title">Manage Users</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  DocumentReportIcon,
  AnnotationIcon,
} from '@heroicons/vue/solid'
export default {
  data: () => ({
    responsesCount: 0,
    todaysResponsesCount: 0,
    questionsCount: 0,
    userCount: 0,
  }),
  components: {
    UserCircleIcon,
    QuestionMarkCircleIcon,
    DocumentReportIcon,
    AnnotationIcon,
  },
  async mounted() {
    await Promise.all([
      this.getResponsesCount(),
      this.getTodaysResponseCount(),
      this.getQuestionsCount(),
      this.getUserCount(),
    ])
  },
  methods: {
    async getResponsesCount() {
      this.$firestore()
        .documentCount('responses')
        .then((res) => (this.responsesCount = res))
    },
    async getQuestionsCount() {
      this.$firestore()
        .documentCount('questions')
        .then((res) => (this.questionsCount = res))
    },
    async getUserCount() {
      this.$firestore()
        .documentCount('users')
        .then((res) => (this.userCount = res))
    },
    async getTodaysResponseCount() {
      const date = new Date().toLocaleDateString()
      this.$firestore()
        .queryDocuments('responses', {
          key: 'submission.date',
          operator: '==',
          value: date,
        })
        .then((res) => (this.todaysResponsesCount = res.length))
    },
  },
}
</script>
