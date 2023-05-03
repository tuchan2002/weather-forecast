import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { IHomeHeaderProps } from "../../../types/HomeScreenComponent";
import GlobalStyles from "../../../utils/GlobalStyles";
import { translate } from "../../../locales";
import { DataContext, IDataContextDefault } from "../../../GlobalState";
import styles from "./home-header-style";

const HomeHeader = ({
  loading,
  followedWeathers,
  followedWeatherIndex,
}: IHomeHeaderProps) => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { language } = dataStore;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();

  const renderChangeCityGroup = () => {
    console.log("loading", loading);

    if (loading) {
      return (
        <Text style={[GlobalStyles.defaultText]}>
          {translate(language).updating}...
        </Text>
      );
    } else {
      return (
        followedWeathers.length > 0 &&
        followedWeathers.map((_, index) => {
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
        })
      );
    }
  };

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
            {followedWeathers[followedWeatherIndex]?.city_name}
          </Text>
          <View style={styles.changeCityGroup}>{renderChangeCityGroup()}</View>
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

export default HomeHeader;
