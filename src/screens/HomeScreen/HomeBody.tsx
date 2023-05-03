import React from "react";
import { ScrollView } from "react-native";
import DailyForecast from "../../components/HomeScreen/DailyForecast";
import HomeMain from "../../components/HomeScreen/Main/Main";
import MoreInfo from "../../components/HomeScreen/MoreInfo";
import { IHomeMainProps } from "../../types/HomeScreenComponent";

const HomeBody = ({ followedWeathersSelected }: IHomeMainProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 95 }}>
      <HomeMain
        temp={followedWeathersSelected.current.main.temp}
        description={followedWeathersSelected.current.weather[0].description}
      />
      <DailyForecast dailyForecast={followedWeathersSelected.daily} />
      <MoreInfo
        wind_speed={followedWeathersSelected.current.wind.speed}
        humidity={followedWeathersSelected.current.main.humidity}
        pressure={followedWeathersSelected.current.main.pressure}
        visibility={followedWeathersSelected.current.visibility}
        clouds={followedWeathersSelected.current.clouds.all}
      />
    </ScrollView>
  );
};

export default HomeBody;
