import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HourlyForecastItem from "../../components/HourlyForecastItem";
import { HourlyDataBlock } from "../../types/response";

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
    padding: 24,
  },
  hourlyForecastList: {
    flexGrow: 0,
  },
  hourlyForecastItem: {
    alignItems: "center",
    padding: 8,
  },
});
export default HourlyForecast;
