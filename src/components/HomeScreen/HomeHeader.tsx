import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IHomeHeaderProps } from "../../types/HomeScreenComponent";
import GlobalStyles from "../../utils/GlobalStyles";

const HomeHeader = ({
  city_name,
  followedWeathers,
  followedWeatherIndex,
}: IHomeHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.homeHeaderContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Feather name="menu" size={26} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={[GlobalStyles.defaultText, styles.cityName]}>
          {city_name}
        </Text>
        <View style={styles.changeCityGroup}>
          {followedWeathers.length > 0 &&
            followedWeathers.map((followedWeather, index) => {
              return index === followedWeatherIndex ? (
                <FontAwesome
                  key={index}
                  name="circle"
                  color="white"
                  size={6}
                  style={{ paddingHorizontal: 6 }}
                />
              ) : (
                <FontAwesome
                  key={index}
                  name="circle-thin"
                  color="white"
                  size={6}
                  style={{ paddingHorizontal: 6 }}
                />
              );
            })}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ManageCities")}>
        <Feather name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  homeHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  changeCityGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  cityName: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
  },
});
export default HomeHeader;
