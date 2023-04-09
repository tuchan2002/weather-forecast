import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import DailyForecast from "../../components/HomeScreen/DailyForecast";
import HourlyForecast from "../../components/HomeScreen/HourlyForecast";
import HomeMain from "../../components/HomeScreen/Main";
import MoreInfo from "../../components/HomeScreen/MoreInfo";
import { IHomeMainProps } from "../../types/HomeScreenComponent";

const HomeBody = ({
  followedWeathers,
  followedWeatherIndex,
}: IHomeMainProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeMain
        dt={followedWeathers[followedWeatherIndex].current.dt}
        icon={followedWeathers[followedWeatherIndex].current.weather[0].icon}
        temp={followedWeathers[followedWeatherIndex].current.temp}
        description={
          followedWeathers[followedWeatherIndex].current.weather[0].description
        }
      />
      <HourlyForecast
        hourlyForecast={followedWeathers[followedWeatherIndex].hourly}
      />
      <DailyForecast
        dailyForecast={followedWeathers[followedWeatherIndex].daily}
      />
      <MoreInfo
        wind_speed={followedWeathers[followedWeatherIndex].current.wind_speed}
        humidity={followedWeathers[followedWeatherIndex].current.humidity}
        pressure={followedWeathers[followedWeatherIndex].current.pressure}
        visibility={followedWeathers[followedWeatherIndex].current.visibility}
        clouds={followedWeathers[followedWeatherIndex].current.clouds}
        uvi={followedWeathers[followedWeatherIndex].current.uvi}
      />
    </ScrollView>
  );
};

export default HomeBody;
