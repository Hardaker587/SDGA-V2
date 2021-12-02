import { ChartTypeEnum } from '@/enums/chart-type.enum'
import { SeriesInterface } from './Series.Interface'
import { XAxisInterface } from './XAxis.interface'

export interface ChartsBaseInterface {
  chart: ChartTypeEnum
  series: Array<SeriesInterface>
  xaxis: XAxisInterface
}
