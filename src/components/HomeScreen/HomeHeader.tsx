import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { IHomeHeaderProps } from "../../types/HomeScreenComponent";
import GlobalStyles from "../../utils/GlobalStyles";

const HomeHeader = ({
  city_name,
  followedWeathers,
  followedWeatherIndex,
}: IHomeHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.homeHeaderContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.homeHeaderContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{ marginLeft: 24 }}
        >
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={[GlobalStyles.defaultText, styles.cityName]}>
            {city_name}
          </Text>
          <View style={styles.changeCityGroup}>
            {followedWeathers.length > 0 &&
              followedWeathers.map((followedWeather, index) => {
                return index === 0 ? (
                  <FontAwesome5
                    key={index}
                    name="location-arrow"
                    color={
                      index === followedWeatherIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.5)"
                    }
                    size={8}
                    style={{ paddingHorizontal: 6 }}
                  />
                ) : (
                  <FontAwesome
                    key={index}
                    name="circle"
                    color={
                      index === followedWeatherIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.5)"
                    }
                    size={5}
                    style={{ paddingHorizontal: 6 }}
                  />
                );
              })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ManageCities")}
          style={{ marginRight: 24 }}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  homeHeaderContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    zIndex: 10,
    height: 96,
  },
  homeHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
  },
  changeCityGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 2,
  },
  cityName: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
  },
});
export default HomeHeader;
