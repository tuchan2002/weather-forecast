import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { HourlyDataBlock } from "../../types/response";
import HourlyForecastItem from "./HourlyForecastItem";

const HourlyForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: HourlyDataBlock[];
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        style={styles.hourlyForecastList}
        showsHorizontalScrollIndicator={false}
        data={hourlyForecast}
        renderItem={({ item }) => (
          <HourlyForecastItem hourlyForecastItem={item} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  hourlyForecastList: {
    flexGrow: 0,
  },
});
export default HourlyForecast;
