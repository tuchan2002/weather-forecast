import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeBody from "./HomeBody";
import {
  CustomForecast,
  CustomForecastBlock,
} from "../../types/response/CustomForecast";

const HomeScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const insets = useSafeAreaInsets();

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);
  const [xPosition, setXPosition] = useState(0);

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

  return (
    <View style={styles.container}>
      {followedWeathers.length > 0 ? (
        <GestureHandlerRootView
          style={{ flex: 1 }}
          onTouchStart={(e) => {
            console.log("START", xPosition);
            setXPosition(e.nativeEvent.pageX);
          }}
          onTouchEnd={(e) => {
            console.log("END", xPosition);
            if (xPosition - e.nativeEvent.pageX < -10) {
              handlePrevFollowedWeather();
            } else if (xPosition - e.nativeEvent.pageX > 10) {
              handleNextFollowedWeather();
            }
          }}
        >
          <ImageBackground
            source={getWeatherBackground(
              followedWeathers[followedWeatherIndex].current.weather
            )}
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
              <HomeHeader
                city_name={followedWeathers[followedWeatherIndex].city_name}
                followedWeathers={followedWeathers}
                followedWeatherIndex={followedWeatherIndex}
              />

              <HomeBody
                followedWeathers={followedWeathers}
                followedWeatherIndex={followedWeatherIndex}
              />
            </View>
          </ImageBackground>
        </GestureHandlerRootView>
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
    width: "100%",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
