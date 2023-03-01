import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
  sunrise: number;
  sunset: number;
}
const HomeMain = ({
  city_name,
  dt,
  icon,
  temp,
  feels_like,
  description,
  sunrise,
  sunset,
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
          marginVertical: 20,
        }}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
        <Text style={{ color: "white", fontSize: 60 }}>{`${Math.round(
          temp
        )}°`}</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginVertical: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="sunrise" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 6,
            }}
          >
            {moment.unix(sunrise).format("HH:mm")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="sunset" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 6,
            }}
          >
            {moment.unix(sunset).format("HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
export default HomeMain;
