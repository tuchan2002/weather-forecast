import { DataBlock } from "./datablock";

export interface DailyDataBlock extends DataBlock {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: TemperatureBlock;
  feels_like: TemperatureDayBlock;
  uvi: number;
  rain?: number;
  snow?: number;
  pop: number;
}

export interface TemperatureDayBlock {
  morn: number;
  day: number;
  eve: number;
  night: number;
}

export interface TemperatureBlock extends TemperatureDayBlock {
  min: number;
  max: number;
}
