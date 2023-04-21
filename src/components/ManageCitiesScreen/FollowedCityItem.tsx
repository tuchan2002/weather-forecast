import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FollowedCityItemProps } from "../../types/ManageCitiesComponent";

const FollowedCityItem = ({
  city_name,
  temp_max,
  temp_min,
  current_temp,
}: FollowedCityItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        <Text style={styles.cityName}>{city_name}</Text>
        <Text style={styles.minMaxTemp}>{`${Math.round(
          temp_min
        )}° / ${Math.round(temp_max)}°`}</Text>
      </View>
      <Text style={styles.currentTemp}>{`${Math.round(current_temp)}°`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 24,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
  },
  basicInfo: {},
  minMaxTemp: {
    color: "gray",
  },
  cityName: {
    fontSize: 18,
  },
  currentTemp: { fontSize: 36 },
});

export default FollowedCityItem;
