import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FollowedCityItemProps } from "../../types/ManageCitiesComponent";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DataContext, IDataContextDefault } from "../../GlobalState";

const FollowedCityItem = ({
  city_name,
  temp_max,
  temp_min,
  current_temp,
}: FollowedCityItemProps) => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { currentCity } = dataStore;

  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        <Text style={styles.cityName}>
          {city_name}
          {city_name === currentCity && (
            <Ionicons name="md-location-sharp" size={18} color="black" />
          )}
        </Text>
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
    marginTop: 8,
    marginBottom: 4,
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
