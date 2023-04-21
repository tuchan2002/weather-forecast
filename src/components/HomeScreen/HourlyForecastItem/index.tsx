import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { HourlyDataBlock } from "../../../types/response";
import { CustomForecastBlock } from "../../../types/response/CustomForecast";
import GlobalStyles from "../../../utils/GlobalStyles";

const HourlyForecastItem = ({
  hourlyForecastItem,
}: {
  hourlyForecastItem: CustomForecastBlock;
}) => {
  const { dt, weather, main } = hourlyForecastItem;

  return (
    <View style={styles.hourlyForecastItem}>
      <Text style={{ color: "white" }}>{moment.unix(dt).format("HH:mm")}</Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text style={[GlobalStyles.defaultText]}>{`${Math.round(
        main.temp
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
