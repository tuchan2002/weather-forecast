import { weatherBackgrounds } from "../../../assets/weather-backgrounds";
import { WeatherBlock } from "../../types/response";

type WeatherBackgroundsKey = keyof typeof weatherBackgrounds;

export const getWeatherBackground = (weather: WeatherBlock[]) => {
  if (!weather) {
    return;
  }

  if (weather[0].id === 804) {
    return weatherBackgrounds[`${weather[0].icon}_2` as WeatherBackgroundsKey];
  }
  return weatherBackgrounds[weather[0].icon as WeatherBackgroundsKey];
};
