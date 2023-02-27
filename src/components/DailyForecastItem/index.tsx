import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const DailyForecastItem = () => {
  return (
    <View style={styles.dailyForecastItem}>
      <Text style={{ color: "white" }}>Wed</Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: "https://openweathermap.org/img/wn/10d@2x.png",
        }}
      />

      <Text
        style={{
          color: "white",
          textTransform: "capitalize",
          flexWrap: "wrap",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        clear sky
      </Text>
      <Text style={{ color: "white", fontSize: 16 }}>20°</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  dailyForecastItem: {
    alignItems: "center",
    padding: 8,
    width: 80,
  },
});
export default DailyForecastItem;
