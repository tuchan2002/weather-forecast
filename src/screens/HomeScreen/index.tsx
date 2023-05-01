import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
} from "react-native";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import {
  getFullWeatherByCityName,
  getWeatherBackground,
} from "../../utils/methods";
import HomeBody from "./HomeBody";
import { CustomForecast } from "../../types/response/CustomForecast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { getCityByCoordinates } from "../../utils/apis";

const HomeScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const {
    setLanguage,
    setTempUnit,
    setFollowedCities,
    setCurrentCity,
    currentCity,
    language,
    tempUnit,
  } = dataStore;

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );

  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);

  useEffect(() => {
    const setGlobalState = async () => {
      try {
        // await AsyncStorage.setItem(
        //   "@weatherForecast",
        //   JSON.stringify({
        //     language: "en",
        //     tempUnit: "metric",
        //     followedCities: [],
        //   })
        // );

        // set app setting
        const globalStateJson = await AsyncStorage.getItem("@weatherForecast");
        const globalState = JSON.parse(globalStateJson || "");
        const { language, tempUnit, followedCities } = globalState;

        setLanguage(language);
        setTempUnit(tempUnit);
        setFollowedCities(followedCities);
      } catch (error) {
        console.log(error);
      }
    };

    setGlobalState();
  }, []);

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      // set current city
      console.log("Location loading...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const currentCity = await getCityByCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );
      setCurrentCity(currentCity[0].name);

      // get all of cities weather
      const allOfCities = [currentCity[0].name, ...dataStore?.followedCities];
      console.log("allOfCities", allOfCities);
      const followedWeathersPromiseArray = allOfCities.map((followedCity) =>
        getFullWeatherByCityName(followedCity, language, tempUnit)
      );

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, [dataStore?.followedCities, language, tempUnit]);

  const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== followedWeatherIndex) {
        setFollowedWeatherIndex(slide);
      }
    }
  };

  return (
    <View style={styles.container}>
      {followedWeathers.length > 0 ? (
        <View style={{ flex: 1 }}>
          <HomeHeader
            city_name={followedWeathers[followedWeatherIndex].city_name}
            followedWeathers={followedWeathers}
            followedWeatherIndex={followedWeatherIndex}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={({ nativeEvent }) => handleOnScroll(nativeEvent)}
          >
            {followedWeathers.map((item, index) => (
              <ImageBackground
                source={getWeatherBackground(item.current.weather)}
                resizeMode="cover"
                style={styles.weatherBackground}
                key={index}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <HomeBody followedWeathersSelected={item} />
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherBackground: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
