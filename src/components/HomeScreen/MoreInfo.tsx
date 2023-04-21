import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  IconType,
  IMoreInfoItem,
  IMoreInfoProps,
} from "../../types/HomeScreenComponent";
import MoreInfoItem from "./MoreInfoItem";

const MoreInfo = ({
  humidity,
  wind_speed,
  visibility,
  pressure,
  clouds,
}: IMoreInfoProps) => {
  const moreInfoItems: IMoreInfoItem[] = [
    {
      labelIcon: { iconType: IconType.Ionicons, iconName: "water-outline" },
      labelText: "Humidity",
      valueText: `${humidity} %`,
    },
    {
      labelIcon: {
        iconType: IconType.Ionicons,
        iconName: "speedometer-outline",
      },
      labelText: "Pressure",
      valueText: `${pressure} hPa`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "wind" },
      labelText: "Wind Speed",
      valueText: `${Math.round(wind_speed * 3.6)} Km/h`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "cloud" },
      labelText: "Cloud",
      valueText: `${clouds} %`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "eye" },
      labelText: "Visibility",
      valueText: `${visibility / 1000} Km`,
    },
  ];

  const renderMoreInfoItems = () => {
    return moreInfoItems.map((moreInfoItem, index) => (
      <MoreInfoItem moreInfoItem={moreInfoItem} key={index} />
    ));
  };

  return <View style={styles.container}>{renderMoreInfoItems()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 24,
    padding: 24,
    marginBottom: 12,
  },
});

export default MoreInfo;
