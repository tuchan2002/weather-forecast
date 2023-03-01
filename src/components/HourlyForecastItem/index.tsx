import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { HourlyDataBlock } from "../../types/response";

const HourlyForecastItem = ({
  hourlyForecastItem,
}: {
  hourlyForecastItem: HourlyDataBlock;
}) => {
  const { dt, weather, temp } = hourlyForecastItem;

  return (
    <View style={styles.hourlyForecastItem}>
      <Text style={{ color: "white" }}>{moment.unix(dt).format("HH:mm")}</Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text style={{ color: "white", fontSize: 16 }}>{`${Math.round(
        temp
      )}°`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  hourlyForecastItem: {
    alignItems: "center",
    padding: 8,
  },
});
export default HourlyForecastItem;
