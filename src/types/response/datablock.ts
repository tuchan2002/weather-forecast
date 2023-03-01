import { TemperatureBlock, TemperatureDayBlock } from "./daily";
import { WeatherBlock } from "./weather";

export interface PrecipitationDataPoint {
  "1h": number;
}

export interface DataBlock {
  dt: number;
  temp: number | TemperatureBlock;
  feels_like: number | TemperatureDayBlock;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop?: number;
  rain?: PrecipitationDataPoint | number;
  snow?: PrecipitationDataPoint | number;
  weather: WeatherBlock[];
  uvi?: number;
}
