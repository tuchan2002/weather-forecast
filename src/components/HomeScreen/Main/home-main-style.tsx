import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: Dimensions.get("window").height * 0.55,
    justifyContent: "center",
  },
  currentWeatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  currentWeather: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  currentTemp: {
    fontSize: 100,
    textAlign: "center",
  },
  feelsLike: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  deg: {
    fontSize: 48,
    position: "absolute",
    top: 18,
    right: -20,
  },
});

export default styles;
