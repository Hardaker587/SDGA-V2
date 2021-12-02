import { ReturnAllSurveySelections } from '../enums/survey-selections.enum'

export const filterArray = (arr: Array<any>, key: string, value: any) => {
  return arr.filter((arrayObject) => arrayObject[key] === value)
}

export const generateSeries = (name: string, data: Array<any>) => {
  const returnSeries = []
  const seriesLabels = ReturnAllSurveySelections().map(
    (selection) => selection.value
  )
  seriesLabels.forEach((label) => {
    returnSeries.push(filterArray(data, 'value', label).length)
  })
  return { name, data: returnSeries }
}
