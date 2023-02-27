import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HourlyForecastItem from "../../components/HourlyForecastItem";

const hourlyForecastItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const HourlyForecast = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        style={styles.hourlyForecastList}
        showsHorizontalScrollIndicator={false}
        data={hourlyForecastItems}
        renderItem={({ item }) => <HourlyForecastItem key={item} />}
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
