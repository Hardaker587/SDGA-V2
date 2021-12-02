<template>
  <div class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4 btn-sm md:btn-md"
        @click="$router.push('/admin/reports')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <div>
        <h1 class="text-lg md:text-2xl font-black">
          {{ $route.params.chart }} chart
        </h1>
        <h1 class="text-md md:text-lg">Select data to see your chart</h1>
      </div>
    </div>
    <button class="btn mr-4 btn-sm md:btn-md" @click="generateChart()">
      Generate Chart
    </button>
    <div id="chart-view"></div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import ApexCharts from 'apexcharts'

export default {
  name: '[chart]',
  data: () => ({
    goals: null,
    categories: null,
    questions: null,
    responses: null,
    chart: null,
  }),
  components: {
    ChevronLeftIcon,
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy()
  },
  methods: {
    fetchGoals() {
      this.$firestore()
        .getAllDocuments('goals')
        .then((res) => (this.goals = res))
    },
    fetchCategories() {
      this.$firestore()
        .getAllDocuments('categories')
        .then((res) => (this.categories = res))
    },
    fetchQuestions() {
      this.$firestore()
        .getAllDocuments('questions')
        .then((res) => (this.questions = res))
    },
    fetchResponses() {
      this.$firestore()
        .getAllDocuments('responses')
        .then((res) => (this.responses = res))
    },
    generateChart() {
      const options = {
        chart: {
          type: this.$route.params.chart,
        },
        series: [
          {
            name: 'sales',
            data: [45, 41, 45, 50, 49, 60, 70, 91, 150],
          },
          {
            name: 'sales-2',
            data: [30, 40, 45, 50, 49, 60, 70, 91, 220],
          },
        ],
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      }
      this.chart = new ApexCharts(
        document.getElementById('chart-view'),
        options
      )
      this.chart.render()
    },
  },
}
</script>
