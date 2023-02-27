import React from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/typescript";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "./header";
import HomeMain from "./main";
import HourlyForecast from "./hourly-forecast";
import DailyForecast from "./daily-forecast";
import MoreInfo from "./more-info";

const clearWeatherImage = require("../../../assets/weather-backgrounds/01d.jpg");
const HomeScreen = () => {
  const { countReducer } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();

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
