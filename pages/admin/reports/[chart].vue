<template>
  <div class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4 btn-sm md:btn-md"
        @click="$router.replace('/admin/reports')"
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
    <div ref="chart-view" :key="uuid()"></div>
  </div>
</template>

<script setup>
import { uuid } from '../../../utilities/uuid'
const chart_view = ref(null)
</script>
<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import { filterArray } from '../../../utilities/data'
import { ReturnAllSurveySelections } from '../../../enums/survey-selections.enum'

export default {
  name: '[chart]',
  data: () => ({
    goals: null,
    categories: null,
    questions: null,
    responses: null,
    chart: null,
    series: null,
  }),
  components: {
    ChevronLeftIcon,
  },
  unmounted() {
    this.$forceUpdate()
  },
  mounted() {
    this.fetchResponses()
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
    async fetchResponses() {
      await this.$firestore()
        .getAllDocuments('responses')
        .then((res) => {
          // flatten data
          const flatArray = []
          res.forEach((response) => flatArray.push(response.responses))
          const series = this.generateSeries('All responses', flatArray.flat())
          this.generateChart([series], this.generateLabels())
        })
    },
    generateLabels() {
      return ReturnAllSurveySelections().map((selection) => selection.value)
    },
    generateSeries(name, data) {
      const returnSeries = []
      this.generateLabels().forEach((label) => {
        returnSeries.push(filterArray(data, 'value', label).length)
      })
      return { name, data: returnSeries }
    },
    generateChart(series, labels) {
      this.chart = null
      const options = {
        chart: {
          type: this.$route.params.chart,
        },
        series,
        xaxis: {
          categories: labels,
        },
      }
      try {
        this.chart = this.$chart(this.$refs['chart-view'], options)
        this.chart.render()
      } catch (e) {
        console.error('error rendering chart', e)
      }
    },
  },
}
</script>
