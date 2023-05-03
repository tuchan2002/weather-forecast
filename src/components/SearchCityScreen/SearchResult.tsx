import React, { useContext } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { translate } from "../../locales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CustomForecastSearchCity } from "../../types/response/CustomForecast";
import styles from "./search-result-style";

const SearchResult = ({
  searchedForecastWeather,
}: {
  searchedForecastWeather: CustomForecastSearchCity[];
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { followedCities, setFollowedCities, currentCity, language } =
    dataStore;

  const handleAddCity = async () => {
    const newFollowedCities = [
      ...followedCities,
      searchedForecastWeather[0].city_name,
    ];
    setFollowedCities(newFollowedCities);

    await AsyncStorage.setItem(
      "@weatherForecast",
      JSON.stringify({
        language: "en",
        tempUnit: "metric",
        followedCities: newFollowedCities,
      })
    );
    Alert.alert(
      translate(language).addSuccessful,
      searchedForecastWeather[0].city_name
    );
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CityDetail", {
            searchedForecastWeather,
          })
        }
        activeOpacity={0.5}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 18 }}>
              {searchedForecastWeather[0].city_name}
            </Text>
            {[currentCity, ...followedCities].includes(
              searchedForecastWeather[0].city_name
            ) ? (
              <Text style={{ fontSize: 16, color: "gray" }}>
                {translate(language).added}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddCity()}
                style={{ marginBottom: 12 }}
              >
                <AntDesign name="pluscircle" size={30} color="#000" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.contentContainer}>
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
    </View>
  );
};

export default SearchResult;
