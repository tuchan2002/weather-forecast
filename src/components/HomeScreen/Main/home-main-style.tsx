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
    fontSize: 120,
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
    fontSize: 50,
    position: "absolute",
    top: 22,
    right: -22,
  },
});

export default styles;
