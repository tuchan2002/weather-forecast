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
import { FullForecast } from "../../types/response/index";

const clearWeatherImage = require("../../../assets/weather-backgrounds/01d.jpg");
const HomeScreen = () => {
  const [followedWeathers, setFollowedWeathers] = useState<FullForecast[]>([]);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const getFollowedWeather = async () => {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=20&lon=106&exclude=minutely,alerts&appid=acbae9c57a24663635f3918fd4e8f0c7&lang=en&units=metric"
      );
      setFollowedWeathers([...followedWeathers, response.data]);
    };

    getFollowedWeather();
  }, []);

  console.log(followedWeathers);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={clearWeatherImage}
          resizeMode="cover"
          style={styles.weatherBackground}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }}
          >
            <HomeHeader navigation={navigation} />
            <HomeMain />
            <HourlyForecast />
            <DailyForecast />
            <MoreInfo />
          </View>
        </ImageBackground>
      </ScrollView>
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
