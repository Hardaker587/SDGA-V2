import VueApexCharts from "vue3-apexcharts";
import { defineNuxtPlugin } from '#app'
import { ChartsBaseInterface } from '../interfaces/charts/options/ChartsBase.Interface'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts)
})
