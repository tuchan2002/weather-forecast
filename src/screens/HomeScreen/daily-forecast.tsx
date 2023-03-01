import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DailyForecastItem from "../../components/DailyForecastItem";
import { DailyDataBlock } from "../../types/response";

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
    padding: 24,
  },
  dailyForecastList: {
    flexGrow: 0,
  },
});
export default DailyForecast;
