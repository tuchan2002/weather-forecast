import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar, Text } from "@rneui/themed";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DailyForecast from "../../components/HomeScreen/DailyForecast";
import {
  CustomForecastBlock,
  CustomForecastSearchCity,
} from "../../types/response/CustomForecast";
import { getCityByCityName, getWeatherFiveDayByCity } from "../../utils/apis";
import GlobalStyles from "../../utils/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import AntDesign from "react-native-vector-icons/AntDesign";

const SearchCityScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { followedCities, setFollowedCities, currentCity } = dataStore;

  const [cityNameSearch, setCityNameSearch] = useState("");
  const [searchedForecastWeather, setSearchedForecastWeather] = useState<
    CustomForecastSearchCity[]
  >([]);
  const [loading, setLoading] = useState(false);
  const searchBarEl = useRef<any>(null);

  const updateCityNameSearch = (cityNameSearch: string) => {
    if (!cityNameSearch.trim()) {
      setSearchedForecastWeather([]);
    }
    setCityNameSearch(cityNameSearch);
  };

  const handleSubmitSearchBar = async () => {
    if (!cityNameSearch.trim()) {
      return;
    }

    setLoading(true);
    const city = await getCityByCityName(cityNameSearch);

    if (city.length === 0) {
      return;
    }

    const fiveDayForecastWeather: CustomForecastBlock[] =
      await getWeatherFiveDayByCity(city[0].lat, city[0].lon);

    setLoading(false);

    const dailyForecast = fiveDayForecastWeather.filter(
      (_, index) => index % 8 === 0
    );

    setSearchedForecastWeather([
      {
        city_name: city[0].name,
        daily: dailyForecast,
      },
    ]);
  };

  const handleAddCity = async () => {
    const newFollowCities = [
      ...followedCities,
      searchedForecastWeather[0].city_name,
    ];
    setFollowedCities(newFollowCities);

    await AsyncStorage.setItem(
      "@weatherForecast",
      JSON.stringify({
        language: "en",
        tempUnit: "metric",
        followedCities: newFollowCities,
      })
    );
    Alert.alert(searchedForecastWeather[0].city_name);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchBar
          placeholder="Enter location"
          onChangeText={updateCityNameSearch}
          value={cityNameSearch}
          platform="android"
          containerStyle={{
            borderRadius: 100,
            paddingHorizontal: 8,
            flexGrow: 1,
          }}
          inputStyle={{ flexGrow: 1, fontSize: 16, marginLeft: 10 }}
          ref={searchBarEl}
          onSubmitEditing={handleSubmitSearchBar}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ManageCities")}
          activeOpacity={1}
        >
          <Text
            style={{
              color: "#2089dc",
              fontSize: 18,
              marginLeft: 14,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      {searchedForecastWeather.length > 0 && (
        <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 24 }}>
          {!loading ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CityDetail", {
                  searchedForecastWeather,
                })
              }
              activeOpacity={0.5}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    {searchedForecastWeather[0].city_name}
                  </Text>
                  {[currentCity, ...followedCities].includes(
                    searchedForecastWeather[0].city_name
                  ) ? (
                    <Text style={{ fontSize: 16, color: "gray" }}>Added</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleAddCity()}
                      style={{ marginBottom: 12 }}
                    >
                      <AntDesign name="pluscircle" size={30} color="#000" />
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 24,
                    marginHorizontal: -16,
                  }}
                >
                  {searchedForecastWeather[0].daily.map((item, index) => (
                    <View style={styles.dailyForecastItem} key={index}>
                      <Text>{moment.unix(item.dt).format("ddd")}</Text>
                      <Image
                        style={{ width: 52, height: 52 }}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                        }}
                      />
                      <Text style={{ marginVertical: 10 }}>{`${Math.round(
                        item.main.temp_max
                      )}°`}</Text>
                      <Text>{`${Math.round(item.main.temp_min)}°`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dailyForecastItem: {
    alignItems: "center",
    flex: 1,
  },
});

export default SearchCityScreen;
