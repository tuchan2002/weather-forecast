import { DataBlock, PrecipitationDataPoint } from "./datablock";

export interface CurrentDataBlock extends DataBlock {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  visibility: number;
  uvi: number;
  rain?: PrecipitationDataPoint;
  snow?: PrecipitationDataPoint;
}
