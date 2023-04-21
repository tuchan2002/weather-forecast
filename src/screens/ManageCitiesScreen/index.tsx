import { SearchBar } from "@rneui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FollowedCityItem from "../../components/ManageCitiesScreen/FollowedCityItem";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { FullForecast } from "../../types/response";
import {
  CustomForecast,
  CustomForecastBlock,
} from "../../types/response/CustomForecast";
import {
  getCityByCityName,
  getCurrentWeatherByCity,
  getWeatherByCity,
  getWeatherFiveDayByCity,
} from "../../utils/apis";

const ManageCitiesScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const [cityNameSearch, setCityNameSearch] = useState("");

  const searchBarEl = useRef(null);

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      const followedWeathersPromiseArray = dataStore?.followedCities.map(
        (followedCity) => getFollowedWeather(followedCity)
      );

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, [dataStore?.followedCities]);

  const getFollowedWeather = async (cityName: string) => {
    const city = await getCityByCityName(cityName);
    const fiveDayForecastWeather: CustomForecastBlock[] =
      await getWeatherFiveDayByCity(city[0].lat, city[0].lon);
    const currentWeather: CustomForecastBlock = await getCurrentWeatherByCity(
      city[0].lat,
      city[0].lon
    );

    return {
      city_name: city[0].local_names["en"],
      current: currentWeather,
      hourly: fiveDayForecastWeather.slice(0, 9),
      daily: fiveDayForecastWeather.filter((item, index) => index % 8 === 0),
    };
  };

  const updateCityNameSearch = (cityNameSearch: string) => {
    setCityNameSearch(cityNameSearch);
  };

  const handleSubmitSearchBar = async () => {
    const city = await getCityByCityName(cityNameSearch);
    console.log(city);
  };

  return (
    <SubScreenLayout title="Manage Cities">
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Enter location"
          onChangeText={updateCityNameSearch}
          value={cityNameSearch}
          platform="android"
          containerStyle={{ borderRadius: 100, paddingHorizontal: 8 }}
          ref={searchBarEl}
          onSubmitEditing={handleSubmitSearchBar}
        />

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
});

export default ManageCitiesScreen;
