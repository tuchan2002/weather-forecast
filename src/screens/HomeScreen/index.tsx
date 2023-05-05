import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
} from "react-native";
import HomeHeader from "../../components/HomeScreen/HomeHeader/HomeHeader";
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
import { RouteProp } from "@react-navigation/native";

const HomeScreen = ({
  route,
}: {
  route: RouteProp<{
    params: { cityName: string };
  }>;
}) => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const {
    setLanguage,
    setTempUnit,
    setFollowedCities,
    followedCities,
    setCurrentCity,
    language,
    tempUnit,
  } = dataStore;

  const scrollRef = useRef<ScrollView>(null);
  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const [currentLocationWeather, setCurrentLocationWeather] = useState<
    CustomForecast[]
  >([]);

  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);
  const [loading, setLoading] = useState(false);

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

        setLanguage(globalState.language);
        setTempUnit(globalState.tempUnit);
        setFollowedCities(globalState.followedCities);
      } catch (error) {
        console.log(error);
      }
    };

    setGlobalState();
  }, []);

  useEffect(() => {
    const setCurrentCityWeather = async () => {
      console.log("Location loading...");
      setLoading(true);
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
      console.log("Load Location success !");
      setCurrentCity(currentCity[0].name);

      const currentLocationCityWeather: CustomForecast =
        await getFullWeatherByCityName(currentCity[0].name, language, tempUnit);
      setCurrentLocationWeather([currentLocationCityWeather]);

      setLoading(false);
    };
    setCurrentCityWeather();
  }, [language, tempUnit]);

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      // get all of cities weather
      const allOfCities = [...followedCities];
      const followedWeathersPromiseArray = allOfCities.map((followedCity) =>
        getFullWeatherByCityName(followedCity, language, tempUnit)
      );

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([
        ...currentLocationWeather,
        ...followedWeathersArray,
      ]);
    };
    fetchFollowedWeathers();
  }, [followedCities, currentLocationWeather, language, tempUnit]);

  useEffect(() => {
    handleOnScrollTo(route.params?.cityName);
  }, [route.params?.cityName]);

  const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        Math.round(nativeEvent.contentOffset.x) /
          Math.round(nativeEvent.layoutMeasurement.width)
      );

      if (slide !== followedWeatherIndex) {
        setFollowedWeatherIndex(slide);
      }
    }
  };

  const handleOnScrollTo = (cityName: string) => {
    if (!cityName) return;

    const idx = followedWeathers
      .map((flWeather) => flWeather.city_name)
      .indexOf(cityName);

    console.log("SCROLL TO", idx, cityName);

    scrollRef.current?.scrollTo({
      x: Dimensions.get("window").width * idx,
      animated: true,
    });
  };

  console.log("route.params", route.params);
  console.log("followedWeathers.length", followedWeathers.length);

  return (
    <View style={styles.container}>
      {followedWeathers.length > 0 ? (
        <View style={{ flex: 1 }}>
          <HomeHeader
            loading={loading}
            followedWeathers={followedWeathers}
            followedWeatherIndex={followedWeatherIndex}
          />
          <ScrollView
            ref={scrollRef}
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
