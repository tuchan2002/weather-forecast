import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const HourlyForecastItem = () => {
  return (
    <View style={styles.hourlyForecastItem}>
      <Text style={{ color: "white" }}>00:00</Text>
      <Image
        style={{ width: 52, height: 52 }}
        source={{
          uri: "https://openweathermap.org/img/wn/01d@2x.png",
        }}
      />
      <Text style={{ color: "white", fontSize: 16 }}>20°</Text>
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
