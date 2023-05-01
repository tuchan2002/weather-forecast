import { weatherBackgrounds } from "../../../assets/weather-backgrounds";
import { WeatherBlock } from "../../types/response";
import { CustomForecastBlock } from "../../types/response/CustomForecast";
import {
  getCityByCityName,
  getCurrentWeatherByCity,
  getWeatherFiveDayByCity,
} from "../apis";

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

export const getFullWeatherByCityName = async (
  cityName: string,
  lang: string,
  units: string
) => {
  const city = await getCityByCityName(cityName);
  const fiveDayForecastWeather: CustomForecastBlock[] =
    await getWeatherFiveDayByCity(city[0].lat, city[0].lon, lang, units);
  const currentWeather: CustomForecastBlock = await getCurrentWeatherByCity(
    city[0].lat,
    city[0].lon,
    lang,
    units
  );

  return {
    city_name: city[0].local_names["en"],
    current: currentWeather,
    hourly: fiveDayForecastWeather.slice(0, 9),
    daily: fiveDayForecastWeather.filter((item, index) => index % 8 === 0),
  };
};
