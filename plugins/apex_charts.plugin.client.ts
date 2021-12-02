import * as ApexCharts from 'apexcharts'
import { defineNuxtPlugin } from '#app'
import { ChartsBaseInterface } from '../interfaces/charts/options/ChartsBase.Interface'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('chart', (element, options: ChartsBaseInterface) => {
    return new ApexCharts(element, options)
  })
})

declare module '#app' {
  interface NuxtApp {
    $chart(): ApexCharts
  }
}
