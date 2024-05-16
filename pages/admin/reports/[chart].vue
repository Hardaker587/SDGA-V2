<script setup>
  await adminMiddleware()
</script>

<template>
  <div v-if="$authStore().getclaims?.admin" class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4 btn-sm"
        @click="$router.replace('/admin/reports')"
      >
        <ChevronLeftIcon class="w-6" />
      </button>
      <div>
        <h1 class="text-lg md:text-2xl font-black capitalize">
          {{ $route.params.chart }} chart
        </h1>
        <h1 class="text-md md:text-lg">Select data to see your chart</h1>
        <div
          v-if="series && options"
          class="text-error underline"
          @click=";(series = null), (options = null)"
        >
          reset
        </div>
      </div>
    </div>
    <AdminReportsDataSelector
      v-if="!options && !series"
      @chart-all-responses="fetchAllResponses()"
      @chart-goals="fetchResponses($event, 'goals', 'goalId', 'title')"
      @chart-categories="fetchResponses($event, 'categories', 'categoryId', 'title')"
      @chart-questions="fetchResponses($event, 'questions', 'questionId', 'question')"
    />
    <apexchart
      v-if="series && options"
      class="mt-4"
      :type="$route.params.chart || 'bar'"
      :options="options"
      :series="series"
    />
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
    fetchResponses(fetchIds, collection, fieldLookup, seriesLabelLookup) {
      const series = []
      fetchIds.forEach(async (id) => {
        let singleDocument = ''
        let responses = []
        await this.$firestore()
          .getOneDocument(collection, id)
          .then((res) => (singleDocument = res))
        await this.$firestore()
          .getAllDocuments('responses')
          .then((res) => {
            const mappedResponses = res
              .map((response) => response.responses)
              .flat()
            responses = mappedResponses.filter(
              (mappedResponse) => mappedResponse[fieldLookup] === id
            )
          })
        series.push(
          this.generateSeries(singleDocument[seriesLabelLookup], responses)
        )
        this.generateChart(series, this.generateLabels())
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
  },
}
</script>
