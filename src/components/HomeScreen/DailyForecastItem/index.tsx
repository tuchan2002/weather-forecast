import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DailyDataBlock } from "../../../types/response";
import { CustomForecastBlock } from "../../../types/response/CustomForecast";
import GlobalStyles from "../../../utils/GlobalStyles";

const DailyForecastItem = ({
  dailyForecastItem,
}: {
  dailyForecastItem: CustomForecastBlock;
}) => {
  const { dt, weather, main } = dailyForecastItem;

  return (
    <View style={styles.dailyForecastItem}>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text style={[GlobalStyles.defaultText, styles.description]}>
        {moment.unix(dt).format("ddd")}・{weather[0].description}
      </Text>
      <Text style={[GlobalStyles.defaultText]}>
        {`${Math.round(main.temp_max)}°`} / {`${Math.round(main.temp_min)}°`}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  dailyForecastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    textTransform: "capitalize",
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 8,
  },
});
export default DailyForecastItem;
