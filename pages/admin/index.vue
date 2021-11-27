<template>
  <div>
    <h1 class="text-2xl font-black mb-4">General overview</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Total surveys completed</h2>
          <p>{{ getResponsesCount() }}</p>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Surveys completed today</h2>
          <p>000</p>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Total questions</h2>
          <p>000</p>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Total users</h2>
          <p>000</p>
        </div>
      </div>
    </div>
    <hr class="mb-4" />
    <h1 class="text-2xl font-black mb-4">Navigation</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div class="card shadow-lg">
        <div class="card-body text-center">
          <QuestionMarkCircleIcon class="h-24 mb-4" />
          <h2 class="card-title">Manage Questions</h2>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body text-center">
          <DocumentReportIcon class="h-24 mb-4" />
          <h2 class="card-title">View Reports</h2>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body text-center">
          <AnnotationIcon class="h-24 mb-4" />
          <h2 class="card-title">View Responses</h2>
        </div>
      </div>
      <div class="card shadow-lg">
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
  components: {
    UserCircleIcon,
    QuestionMarkCircleIcon,
    DocumentReportIcon,
    AnnotationIcon,
  },
  methods: {
    async getResponsesCount() {
      let count = 0
      await this.$database()
        .findAll('surveyResponses')
        .then((res) => {
          count = Object.keys(res).length
        })
      console.log(count)
      return count
    },
  },
}
</script>
