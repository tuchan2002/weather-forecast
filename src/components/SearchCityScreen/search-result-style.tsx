import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: -16,
  },
  dailyForecastItem: {
    alignItems: "center",
    flex: 1,
  },
});

export default styles;
