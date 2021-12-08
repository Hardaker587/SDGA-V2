<template>
  <div class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button
        class="btn btn-circle mr-4 btn-sm md:btn-md"
        @click="$router.push('/admin')"
      >
        <ChevronLeftIcon class="w-8" />
      </button>
      <div>
        <h1 class="text-lg md:text-2xl font-black">Reports</h1>
        <h1 class="text-md md:text-lg">Select a report type to continue</h1>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="card shadow-lg bg-white hover:bg-blue-200" @click="$router.push('/admin/reports/bar')">
        <div class="card-body text-center">
          <ChartBarIcon class="h-24 mb-4" />
          <h2 class="card-title">Bar chart</h2>
        </div>
      </div>
      <div class="card shadow-lg bg-white hover:bg-green-200" @click="$router.push('/admin/reports/line')">
        <div class="card-body text-center">
          <DocumentReportIcon class="h-24 mb-4" />
          <h2 class="card-title">Line chart</h2>
        </div>
      </div>
      <div class="card shadow-lg bg-white hover:bg-red-200" @click="$router.push('/admin/reports/radar')">
        <div class="card-body text-center">
          <AnnotationIcon class="h-24 mb-4" />
          <h2 class="card-title">Radar chart</h2>
        </div>
      </div>
      <div class="card shadow-lg bg-white hover:bg-purple-200" @click="$router.push('/admin/reports/area')">
        <div class="card-body text-center">
          <AnnotationIcon class="h-24 mb-4" />
          <h2 class="card-title">Area chart</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  DocumentReportIcon,
  AnnotationIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/solid'

export default {
  name: 'index',
  components: {
    ChevronLeftIcon,
    ChartBarIcon,
    QuestionMarkCircleIcon,
    DocumentReportIcon,
    AnnotationIcon,
  },
}
</script>
