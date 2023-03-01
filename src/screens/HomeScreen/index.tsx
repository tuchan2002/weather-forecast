import React, { useEffect, useState } from "react";
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

const clearWeatherImage = require("../../../assets/weather-backgrounds/01d.jpg");
const HomeScreen = () => {
  const [followedWeather, setFollowedWeather] = useState<FullForecast[]>([]);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const getFollowedWeather = async () => {
      const cityResponse = await axios.get(
        "http://api.openweathermap.org/geo/1.0/direct?q=ha noi&limit=&appid=acbae9c57a24663635f3918fd4e8f0c7"
      );
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityResponse.data[0].lat}&lon=${cityResponse.data[0].lon}&exclude=minutely,alerts&appid=acbae9c57a24663635f3918fd4e8f0c7&lang=en&units=metric`
      );
      setFollowedWeather([
        ...followedWeather,
        {
          ...weatherResponse.data,
          city_name: cityResponse.data[0].local_names["en"],
          hourly: weatherResponse.data.hourly.slice(1, 25),
        },
      ]);
    };

    getFollowedWeather();
  }, []);

  console.log(followedWeather[0]);

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
            <HomeMain
              city_name={followedWeather[0]?.city_name}
              dt={followedWeather[0]?.current.dt}
              icon={followedWeather[0]?.current.weather[0].icon}
              temp={followedWeather[0]?.current.temp}
              feels_like={followedWeather[0]?.current.feels_like}
              description={followedWeather[0]?.current.weather[0].description}
              sunrise={followedWeather[0]?.current.sunrise}
              sunset={followedWeather[0]?.current.sunset}
            />
            <HourlyForecast hourlyForecast={followedWeather[0]?.hourly} />
            <DailyForecast dailyForecast={followedWeather[0]?.daily} />
            <MoreInfo />
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
