import { DataBlock, PrecipitationDataPoint } from "./datablock";

export interface HourlyDataBlock extends DataBlock {
  temp: number;
  feels_like: number;
  rain?: PrecipitationDataPoint;
  snow?: PrecipitationDataPoint;
  pop: number;
  visibility: number;
}
