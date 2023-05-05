import { FullForecast } from "../response";
import { CustomForecast } from "../response/CustomForecast";

export interface IMoreInfoProps {
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  clouds: number;
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
  loading: boolean;
  followedWeathers: CustomForecast[];
  followedWeatherIndex: number;
}

export interface IHomeMainProps {
  followedWeathersSelected: CustomForecast;
}
export interface HomeMainProps {
  temp: number;
  description: string;
}
