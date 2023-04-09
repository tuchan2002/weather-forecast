import { FullForecast } from "../response";

export interface IMoreInfoProps {
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  clouds: number;
  uvi: number;
}
export interface ILabelIcon {
  iconType: IconType;
  iconName: string;
}
export interface IMoreInfoItem {
  labelIcon: ILabelIcon;
  labelText: string;
  valueText: string;
}
export enum IconType {
  Ionicons = "ionicons",
  Feather = "feather",
}

export interface IHomeHeaderProps {
  city_name: string;
  followedWeathers: FullForecast[];
  followedWeatherIndex: number;
}

export interface HomeMainProps {
  dt: number;
  icon: string;
  temp: number;
  feels_like: number;
  description: string;
  handleNextFollowedWeather: () => void;
  handlePrevFollowedWeather: () => void;
}
