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
import HomeHeader from "../../components/HomeScreen/Header";
import HomeMain from "../../components/HomeScreen/Main";
import HourlyForecast from "../../components/HomeScreen/HourlyForecast";
import DailyForecast from "../../components/HomeScreen/DailyForecast";
import MoreInfo from "../../components/HomeScreen/MoreInfo";
import { FullForecast } from "../../types/response";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { getWeatherBackground } from "../../utils/methods";
import { getCityByCityName, getWeatherByCity } from "../../utils/apis";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const insets = useSafeAreaInsets();

  const [followedWeathers, setFollowedWeathers] = useState<FullForecast[]>([]);
  const [followedWeatherIndex, setFollowedWeatherIndex] = useState(0);
  const [xPosition, setXPosition] = useState(0);

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

  const getFollowedWeather = async (cityName: string) => {
    const city = await getCityByCityName(cityName);
    const weather: FullForecast = await getWeatherByCity(
      city[0].lat,
      city[0].lon
    );

    return {
      ...weather,
      city_name: city[0].local_names["en"],
      hourly: weather.hourly.slice(1, 25),
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
            console.log("START", e.nativeEvent.pageX);
            setXPosition(e.nativeEvent.pageX);
          }}
          onTouchEnd={(e) => {
            console.log("END", e.nativeEvent.pageX);
            if (xPosition - e.nativeEvent.pageX < -15) {
              handlePrevFollowedWeather();
            } else if (xPosition - e.nativeEvent.pageX > 15) {
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

              <ScrollView showsVerticalScrollIndicator={false}>
                <HomeMain
                  dt={followedWeathers[followedWeatherIndex].current.dt}
                  icon={
                    followedWeathers[followedWeatherIndex].current.weather[0]
                      .icon
                  }
                  temp={followedWeathers[followedWeatherIndex].current.temp}
                  feels_like={
                    followedWeathers[followedWeatherIndex].current.feels_like
                  }
                  description={
                    followedWeathers[followedWeatherIndex].current.weather[0]
                      .description
                  }
                  handleNextFollowedWeather={handleNextFollowedWeather}
                  handlePrevFollowedWeather={handlePrevFollowedWeather}
                />
                <HourlyForecast
                  hourlyForecast={followedWeathers[followedWeatherIndex].hourly}
                />
                <DailyForecast
                  dailyForecast={followedWeathers[followedWeatherIndex].daily}
                />
                <MoreInfo
                  wind_speed={
                    followedWeathers[followedWeatherIndex].current.wind_speed
                  }
                  humidity={
                    followedWeathers[followedWeatherIndex].current.humidity
                  }
                  pressure={
                    followedWeathers[followedWeatherIndex].current.pressure
                  }
                  visibility={
                    followedWeathers[followedWeatherIndex].current.visibility
                  }
                  clouds={followedWeathers[followedWeatherIndex].current.clouds}
                  uvi={followedWeathers[followedWeatherIndex].current.uvi}
                />
              </ScrollView>
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
