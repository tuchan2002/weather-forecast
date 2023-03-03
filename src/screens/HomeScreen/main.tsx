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
      <Text
        style={{
          marginBottom: 6,
          color: "white",
          fontWeight: "500",
          fontSize: 18,
        }}
      >
        {city_name}
      </Text>
      <Text style={{ marginBottom: 6, color: "white" }}>
        {moment.unix(dt).format("ddd, DD MMMM")}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={handlePrevFollowedWeather}>
          <Feather name="chevron-left" color="white" size={28} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: icon
                ? `https://openweathermap.org/img/wn/${icon}@2x.png`
                : "",
            }}
          />
          <Text style={{ color: "white", fontSize: 60 }}>{`${Math.round(
            temp
          )}°`}</Text>
        </View>
        <TouchableOpacity onPress={handleNextFollowedWeather}>
          <Feather name="chevron-right" color="white" size={28} />
        </TouchableOpacity>
      </View>

      <Text style={{ marginBottom: 6, color: "white", fontSize: 18 }}>
        {`Feels like ${Math.round(feels_like)}°`}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          textTransform: "capitalize",
          marginBottom: 6,
        }}
      >
        {description}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
export default HomeMain;
