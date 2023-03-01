import { CurrentDataBlock } from "./current";
import { HourlyDataBlock } from "./hourly";
import { DailyDataBlock } from "./daily";

export interface Forecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: CurrentDataBlock;
  hourly?: HourlyDataBlock[];
  daily?: DailyDataBlock[];
}

export interface FullForecast extends Forecast {
  current: CurrentDataBlock;
  hourly: HourlyDataBlock[];
  daily: DailyDataBlock[];
}

export interface CurrentForecast extends Forecast {
  current: CurrentDataBlock;
}

export interface WeekForecast extends Forecast {
  daily: DailyDataBlock[];
}

export interface DayForecast extends Forecast {
  hourly: HourlyDataBlock[];
}

export interface HourForecast extends Forecast {
  hourly: HourlyDataBlock[];
}
