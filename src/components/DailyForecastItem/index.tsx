import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DailyDataBlock } from "../../types/response";
import GlobalStyles from "../../utils/GlobalStyles";

const DailyForecastItem = ({
  dailyForecastItem,
}: {
  dailyForecastItem: DailyDataBlock;
}) => {
  const { dt, weather, temp } = dailyForecastItem;

  return (
    <View style={styles.dailyForecastItem}>
      <Text style={[GlobalStyles.defaultText]}>
        {moment.unix(dt).format("ddd")}
      </Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text style={[GlobalStyles.defaultText, styles.description]}>
        {weather[0].description}
      </Text>
      <View style={styles.tempContainer}>
        <Text style={[GlobalStyles.defaultText]}>{`${Math.round(
          temp.max
        )}°`}</Text>
        <Text style={[styles.minTemp]}>{`${Math.round(temp.min)}°`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dailyForecastItem: {
    alignItems: "center",
    padding: 11,
    width: 88,
  },
  tempContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  minTemp: {
    color: "#ddd",
    fontSize: 13,
  },
  description: {
    textTransform: "capitalize",
    flexWrap: "wrap",
    textAlign: "center",
    marginBottom: 16,
    flex: 1,
  },
});
export default DailyForecastItem;
