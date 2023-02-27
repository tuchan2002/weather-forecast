import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DailyForecastItem from "../../components/DailyForecastItem";

const DailyForecastItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DailyForecast = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        style={styles.dailyForecastList}
        showsHorizontalScrollIndicator={false}
        data={DailyForecastItems}
        renderItem={({ item }) => <DailyForecastItem key={item} />}
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
  dailyForecastList: {
    flexGrow: 0,
  },
  dailyForecastItem: {
    alignItems: "center",
    padding: 8,
    width: 80,
  },
});
export default DailyForecast;
