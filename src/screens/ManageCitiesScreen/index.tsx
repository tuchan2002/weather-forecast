import { SearchBar } from "@rneui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import FollowedCityItem from "../../components/ManageCitiesScreen/FollowedCityItem";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { FullForecast } from "../../types/response";
import { getCityByCityName, getWeatherByCity } from "../../utils/apis";

const ManageCitiesScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);

  const [followedWeathers, setFollowedWeathers] = useState<FullForecast[]>([]);
  const [cityNameSearch, setCityNameSearch] = useState("");

  const searchBarEl = useRef(null);

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      const followedWeathersPromiseArray = dataStore?.followedCities.map(
        (followedCity) => getFollowedWeather(followedCity)
      );

      const followedWeathersArray = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, []);

  const getFollowedWeather = async (cityName: string) => {
    const city = await getCityByCityName(cityName);
    const weather: FullForecast = await getWeatherByCity(
      city[0].lat,
      city[0].lon
    );

    return {
      ...weather,
      city_name: city[0].local_names["en"],
      hourly: weather.hourly.slice(1, 25),
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
      <SearchBar
        placeholder="Enter location"
        onChangeText={updateCityNameSearch}
        value={cityNameSearch}
        platform="android"
        containerStyle={{ borderRadius: 100, paddingHorizontal: 8 }}
        ref={searchBarEl}
        onSubmitEditing={handleSubmitSearchBar}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 24, marginHorizontal: -16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {followedWeathers?.map((followedWeather, index) => (
          <FollowedCityItem
            key={index}
            city_name={followedWeather.city_name}
            temp_max={followedWeather.daily[0].temp.max}
            temp_min={followedWeather.daily[0].temp.min}
            current_temp={followedWeather.current.temp}
          />
        ))}
      </ScrollView>
    </SubScreenLayout>
  );
};

export default ManageCitiesScreen;
