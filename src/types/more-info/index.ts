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
