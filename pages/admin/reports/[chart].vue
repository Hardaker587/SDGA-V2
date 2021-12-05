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
    <AdminReportsDataSelector
      v-if="!chart"
      @chart-all-responses="fetchAllResponses()"
      @chart-goals="logger('goals', $event)"
      @chart-categories="logger('categories', $event)"
      @chart-questions="logger('questions', $event)"
    />
    <apexchart
      v-if="series && options"
      class="mt-4"
      :type="$route.params.chart || 'bar'"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import { filterArray } from '../../../utilities/data'
import { ReturnAllSurveySelections } from '../../../enums/survey-selections.enum'
import AdminReportsDataSelector from '../../../components/admin/reports/admin-reports-data-selector'

export default {
  name: '[chart]',
  data: () => ({
    goals: null,
    categories: null,
    questions: null,
    responses: null,
    chart: null,
    options: null,
    series: null,
  }),
  components: {
    AdminReportsDataSelector,
    ChevronLeftIcon,
  },
  methods: {
    async fetchAllResponses() {
      await this.$firestore()
        .getAllDocuments('responses')
        .then((res) => {
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
      this.options = {
        chart: {
          type: this.$route.params.chart,
        },
        xaxis: {
          categories: labels,
        },
      }
      this.series = series
    },
    logger(name, data) {
      return console.log({ [name]: data })
    },
  },
}
</script>
