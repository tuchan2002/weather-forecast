import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "./header";
import HomeMain from "./main";
import HourlyForecast from "./hourly-forecast";
import DailyForecast from "./daily-forecast";
import MoreInfo from "./more-info";
import axios from "axios";
import { FullForecast } from "../../types/response";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DataContext, IDataContextDefault } from "../../GlobalState";

const clearWeatherImage = require("../../../assets/weather-backgrounds/01d.jpg");
const HomeScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);

  const [followedWeathers, setFollowedWeathers] = useState<FullForecast[]>([]);
  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
  }, [dataStore?.followedCities]);

  const getFollowedWeather = async (city: string) => {
    const cityResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=acbae9c57a24663635f3918fd4e8f0c7`
    );
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityResponse.data[0].lat}&lon=${cityResponse.data[0].lon}&exclude=minutely,alerts&appid=acbae9c57a24663635f3918fd4e8f0c7&lang=en&units=metric`
    );

    return {
      ...weatherResponse.data,
      city_name: cityResponse.data[0].local_names["en"],
      hourly: weatherResponse.data.hourly.slice(1, 25),
    };
  };

  const handleNextFollowedWeather = () => {
    if (followedWeatherIndex < followedWeathers.length - 1) {
      setFollowedWeatherIndex(followedWeatherIndex + 1);
    } else {
      setFollowedWeatherIndex(0);
    }
  };

  const handlePrevFollowedWeather = () => {
    if (followedWeatherIndex > 0) {
      setFollowedWeatherIndex(followedWeatherIndex - 1);
    } else {
      setFollowedWeatherIndex(followedWeathers.length - 1);
    }
  };

  console.log(followedWeathers);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={clearWeatherImage}
        resizeMode="cover"
        style={styles.weatherBackground}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
          >
            <HomeHeader navigation={navigation} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              {followedWeathers.length > 0 &&
                followedWeathers.map((followedWeather, index) => {
                  return index === followedWeatherIndex ? (
                    <FontAwesome
                      key={index}
                      name="circle"
                      color="white"
                      size={6}
                      style={{ paddingHorizontal: 6 }}
                    />
                  ) : (
                    <FontAwesome
                      key={index}
                      name="circle-thin"
                      color="white"
                      size={6}
                      style={{ paddingHorizontal: 6 }}
                    />
                  );
                })}
            </View>
            <HomeMain
              city_name={followedWeathers[followedWeatherIndex]?.city_name}
              dt={followedWeathers[followedWeatherIndex]?.current.dt}
              icon={
                followedWeathers[followedWeatherIndex]?.current.weather[0].icon
              }
              temp={followedWeathers[followedWeatherIndex]?.current.temp}
              feels_like={
                followedWeathers[followedWeatherIndex]?.current.feels_like
              }
              description={
                followedWeathers[followedWeatherIndex]?.current.weather[0]
                  .description
              }
              handleNextFollowedWeather={handleNextFollowedWeather}
              handlePrevFollowedWeather={handlePrevFollowedWeather}
            />
            <HourlyForecast
              hourlyForecast={followedWeathers[followedWeatherIndex]?.hourly}
            />
            <DailyForecast
              dailyForecast={followedWeathers[followedWeatherIndex]?.daily}
            />
            <MoreInfo
              wind_speed={
                followedWeathers[followedWeatherIndex]?.current.wind_speed
              }
              humidity={
                followedWeathers[followedWeatherIndex]?.current.humidity
              }
              pressure={
                followedWeathers[followedWeatherIndex]?.current.pressure
              }
              visibility={
                followedWeathers[followedWeatherIndex]?.current.visibility
              }
              clouds={followedWeathers[followedWeatherIndex]?.current.clouds}
              uvi={followedWeathers[followedWeatherIndex]?.current.uvi}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherBackground: {
    flex: 1,
    width: "100%",
  },
});

export default HomeScreen;
