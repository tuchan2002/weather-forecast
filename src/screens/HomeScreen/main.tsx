import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import GlobalStyles from "../../utils/GlobalStyles";
import moment from "moment";

interface HomeMainProps {
  city_name: string;
  dt: number;
  icon: string;
  temp: number;
  feels_like: number;
  description: string;
  handleNextFollowedWeather: () => void;
  handlePrevFollowedWeather: () => void;
}
const HomeMain = ({
  city_name,
  dt,
  icon,
  temp,
  feels_like,
  description,
  handleNextFollowedWeather,
  handlePrevFollowedWeather,
}: HomeMainProps) => {
  return (
    <View style={styles.main}>
      <Text style={[GlobalStyles.defaultText, styles.cityName]}>
        {city_name}
      </Text>
      <Text style={[GlobalStyles.defaultText]}>
        {moment.unix(dt).format("ddd, DD MMMM")}
      </Text>

      <View style={styles.currentWeatherWrapper}>
        <TouchableOpacity onPress={handlePrevFollowedWeather}>
          <Feather name="chevron-left" color="white" size={28} />
        </TouchableOpacity>
        <View style={styles.currentWeather}>
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
            }}
          />
          <Text
            style={[GlobalStyles.defaultText, styles.currentTemp]}
          >{`${Math.round(temp)}°`}</Text>
        </View>
        <TouchableOpacity onPress={handleNextFollowedWeather}>
          <Feather name="chevron-right" color="white" size={28} />
        </TouchableOpacity>
      </View>

      <Text
        style={[GlobalStyles.defaultText, styles.feelsLike]}
      >{`Feels like ${Math.round(feels_like)}°`}</Text>
      <Text style={[GlobalStyles.defaultText, styles.description]}>
        {description}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  cityName: {
    fontWeight: "500",
    fontSize: 18,
  },
  currentWeatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  currentWeather: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  currentTemp: {
    fontSize: 60,
  },
  feelsLike: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});
export default HomeMain;
