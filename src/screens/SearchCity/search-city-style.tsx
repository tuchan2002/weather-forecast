import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  noResultsWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dailyForecastItem: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    color: "#2089dc",
    fontSize: 18,
    marginLeft: 14,
  },
  searchBarContainerStyle: {
    borderRadius: 100,
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  searchBarInputStyle: { flexGrow: 1, fontSize: 16, marginLeft: 10 },
});

export default styles;
