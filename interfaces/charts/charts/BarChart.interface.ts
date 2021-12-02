import { ChartsBaseInterface } from '../options/ChartsBase.Interface'
import { XAxisInterface } from '../options/XAxis.interface'

export interface BarChartInterface extends ChartsBaseInterface {
  xaxis: XAxisInterface
}
