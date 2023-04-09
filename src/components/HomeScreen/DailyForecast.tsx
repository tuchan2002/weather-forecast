import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { DailyDataBlock } from "../../types/response";
import DailyForecastItem from "./DailyForecastItem";

const DailyForecast = ({
  dailyForecast,
}: {
  dailyForecast: DailyDataBlock[];
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        style={styles.dailyForecastList}
        showsHorizontalScrollIndicator={false}
        data={dailyForecast}
        renderItem={({ item }) => (
          <DailyForecastItem dailyForecastItem={item} />
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
  dailyForecastList: {
    flexGrow: 0,
  },
});
export default DailyForecast;
