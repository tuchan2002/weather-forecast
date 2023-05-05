import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeHeaderContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    zIndex: 10,
    height: 96,
  },
  homeHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
  },
  changeCityGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 2,
  },
  cityName: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});

export default styles;
