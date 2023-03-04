import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MoreInfoItem from "../../components/MoreInfoItem";
import { IconType, IMoreInfoItem, IMoreInfoProps } from "../../types/more-info";

const MoreInfo = ({
  humidity,
  wind_speed,
  visibility,
  pressure,
  clouds,
  uvi,
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
    {
      labelIcon: { iconType: IconType.Feather, iconName: "sun" },
      labelText: "UV Index",
      valueText: `${uvi}`,
    },
  ];

  const renderMoreInfoItems = () => {
    return moreInfoItems.map((moreInfoItem, index) => (
      <MoreInfoItem moreInfoItem={moreInfoItem} key={index} />
    ));
  };

  return <View style={styles.moreInfoContainer}>{renderMoreInfoItems()}</View>;
};

const styles = StyleSheet.create({
  moreInfoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 24,
    padding: 24,
    marginBottom: 12,
  },
});

export default MoreInfo;
