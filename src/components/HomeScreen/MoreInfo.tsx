import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  IconType,
  IMoreInfoItem,
  IMoreInfoProps,
} from "../../types/HomeScreenComponent";
import MoreInfoItem from "./MoreInfoItem";
import { translate } from "../../locales";
import { DataContext, IDataContextDefault } from "../../GlobalState";

const MoreInfo = ({
  humidity,
  wind_speed,
  visibility,
  pressure,
  clouds,
}: IMoreInfoProps) => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { language } = dataStore;

  const moreInfoItems: IMoreInfoItem[] = [
    {
      labelIcon: { iconType: IconType.Ionicons, iconName: "water-outline" },
      labelText: `${translate(language).humidity}`,
      valueText: `${humidity} %`,
    },
    {
      labelIcon: {
        iconType: IconType.Ionicons,
        iconName: "speedometer-outline",
      },
      labelText: `${translate(language).pressure}`,
      valueText: `${pressure} hPa`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "wind" },
      labelText: `${translate(language).windSpeed}`,
      valueText: `${Math.round(wind_speed * 3.6)} Km/h`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "cloud" },
      labelText: `${translate(language).cloud}`,
      valueText: `${clouds} %`,
    },
    {
      labelIcon: { iconType: IconType.Feather, iconName: "eye" },
      labelText: `${translate(language).visibility}`,
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
    paddingBottom: 6,
    marginBottom: 12,
  },
});

export default MoreInfo;
