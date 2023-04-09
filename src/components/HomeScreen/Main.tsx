import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import GlobalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import { HomeMainProps } from "../../types/HomeScreenComponent";

const HomeMain = ({
  dt,
  icon,
  temp,
  feels_like,
  description,
  handleNextFollowedWeather,
  handlePrevFollowedWeather,
}: HomeMainProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentWeatherWrapper}>
        <View style={styles.currentWeather}>
          {/* <Image
            style={{ width: 84, height: 84 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
            }}
          /> */}
          <Text style={[GlobalStyles.defaultText, styles.currentTemp]}>
            {`${Math.round(temp)}`}
          </Text>
          <Text style={[GlobalStyles.defaultText, styles.deg]}>°</Text>
        </View>
      </View>

      <Text style={[GlobalStyles.defaultText, styles.description]}>
        {description}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: Dimensions.get("window").height * 0.55,
    justifyContent: "center",
  },
  currentWeatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  currentWeather: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  currentTemp: {
    fontSize: 100,
    textAlign: "center",
  },
  feelsLike: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  deg: {
    fontSize: 48,
    position: "absolute",
    top: 18,
    right: -20,
  },
});
export default HomeMain;
