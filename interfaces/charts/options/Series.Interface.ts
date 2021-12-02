import { ChartTypeEnum } from "../../enums/chart-type.enum";

export interface SeriesInterface {
  type?: ChartTypeEnum,
  name: string,
  data: Array<number>
}