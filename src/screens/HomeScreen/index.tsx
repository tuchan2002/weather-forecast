import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { getWeatherBackground } from "../../utils/methods";
import {
  getCityByCityName,
  getCurrentWeatherByCity,
  getWeatherFiveDayByCity,
} from "../../utils/apis";
import HomeBody from "./HomeBody";
import {
  CustomForecast,
  CustomForecastBlock,
} from "../../types/response/CustomForecast";

const HomeScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);

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
