import { WeatherBlock } from "../weather";

export interface MainBlock {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
}

export interface WindBlock {
  speed: number;
  deg: number;
  gust: number;
}

export interface CloudsBlock {
  all: number;
}

export interface PrecipitationDataPoint {
  "1h"?: number;
  "3h"?: number;
}

export interface CustomForecastBlock {
  dt: number;
  main: MainBlock;
  weather: WeatherBlock[];
  clouds: CloudsBlock;
  wind: WindBlock;
  visibility: number;
  pop: number;
  rain?: PrecipitationDataPoint | number;
  snow?: PrecipitationDataPoint | number;
  sys: {
    pod: "d";
  };
  dt_txt: string;
}

export interface CustomForecast {
  city_name: string;
  current: CustomForecastBlock;
  hourly: CustomForecastBlock[];
  daily: CustomForecastBlock[];
}

export interface CustomForecastSearchCity {
  city_name: string;
  hourly: CustomForecastBlock[];
  daily: CustomForecastBlock[];
}
