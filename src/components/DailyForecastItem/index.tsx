import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DailyDataBlock } from "../../types/response";

const DailyForecastItem = ({
  dailyForecastItem,
}: {
  dailyForecastItem: DailyDataBlock;
}) => {
  const { dt, weather, temp } = dailyForecastItem;

  return (
    <View style={styles.dailyForecastItem}>
      <Text style={{ color: "white" }}>{moment.unix(dt).format("ddd")}</Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text
        style={{
          color: "white",
          textTransform: "capitalize",
          flexWrap: "wrap",
          textAlign: "center",
          marginBottom: 16,
          flex: 1,
        }}
      >
        {weather[0].description}
      </Text>
      <View style={styles.tempContainer}>
        <Text style={{ color: "white", fontSize: 16 }}>{`${Math.round(
          temp.max
        )}°`}</Text>
        <Text style={{ color: "#ddd", fontSize: 14 }}>{`${Math.round(
          temp.min
        )}°`}</Text>
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
    padding: 4,
  },
});
export default DailyForecastItem;
