import React from "react";
import { Text, View } from "react-native";
import GlobalStyles from "../../../utils/GlobalStyles";
import { HomeMainProps } from "../../../types/HomeScreenComponent";
import styles from "./home-main-style";

const HomeMain = ({ temp, description }: HomeMainProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentWeatherWrapper}>
        <View style={styles.currentWeather}>
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

export default HomeMain;
