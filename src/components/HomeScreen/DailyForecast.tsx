import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomForecastBlock } from "../../types/response/CustomForecast";
import DailyForecastItem from "./DailyForecastItem";

const DailyForecast = ({
  dailyForecast,
}: {
  dailyForecast: CustomForecastBlock[];
}) => {
  return (
    <View style={styles.container}>
      <View>
        {dailyForecast.map((item, index) => (
          <DailyForecastItem key={index} dailyForecastItem={item} />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  dailyForecastList: {
    flexGrow: 0,
  },
});
export default DailyForecast;
