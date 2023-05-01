import { SearchBar } from "@rneui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FollowedCityItem from "../../components/ManageCitiesScreen/FollowedCityItem";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { CustomForecast } from "../../types/response/CustomForecast";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFullWeatherByCityName } from "../../utils/methods";

const ManageCitiesScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { currentCity } = dataStore;

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      const followedWeathersPromiseArray = [
        currentCity,
        ...dataStore?.followedCities,
      ].map((followedCity) => getFullWeatherByCityName(followedCity));

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, [dataStore?.followedCities]);

  return (
    <SubScreenLayout title="Manage Cities">
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchCity")}
          activeOpacity={1}
        >
          <View style={styles.searchInput}>
            <Ionicons name="search" size={22} color="gray" />
            <Text style={{ color: "gray", fontSize: 16, marginLeft: 18 }}>
              Enter location
            </Text>
          </View>
        </TouchableOpacity>

        {followedWeathers.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 24, marginHorizontal: -16 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {followedWeathers.map((followedWeather, index) => (
              <FollowedCityItem
                key={index}
                city_name={followedWeather.city_name}
                temp_max={followedWeather.current.main.temp_max}
                temp_min={followedWeather.current.main.temp_min}
                current_temp={followedWeather.current.main.temp}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </SubScreenLayout>
  );
};
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ManageCitiesScreen;
