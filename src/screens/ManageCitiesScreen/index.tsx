import { Button, SearchBar } from "@rneui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FollowedCityItem from "../../components/ManageCitiesScreen/FollowedCityItem";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { CustomForecast } from "../../types/response/CustomForecast";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFullWeatherByCityName } from "../../utils/methods";
import { translate } from "../../locales";
import Accordion from "react-native-collapsible/Accordion";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageCitiesScreen = () => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { currentCity, language, tempUnit, setFollowedCities } = dataStore;

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      const followedWeathersPromiseArray = [
        currentCity,
        ...dataStore?.followedCities,
      ].map((followedCity) =>
        getFullWeatherByCityName(followedCity, language, tempUnit)
      );

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, [dataStore?.followedCities]);

  const _renderHeader = (section: CustomForecast) => {
    return (
      <FollowedCityItem
        city_name={section.city_name}
        temp_max={section.current.main.temp_max}
        temp_min={section.current.main.temp_min}
        current_temp={section.current.main.temp}
      />
    );
  };

  const _renderContent = (
    section: any,
    index: any,
    isActive: any,
    sections: any
  ) => {
    return (
      <Button
        buttonStyle={{
          backgroundColor: "#ff1744",
          borderWidth: 0,
          borderRadius: 50,
          alignSelf: "center",
          width: "50%",
        }}
        containerStyle={{
          marginVertical: 8,
        }}
        onPress={() => handleRemoveCity(index)}
      >
        {translate(language).remove}
      </Button>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  const handleRemoveCity = async (removeIndex: number) => {
    console.log("OK removeIndex", removeIndex);

    const newFollowedCities = dataStore?.followedCities.filter(
      (_, index) => index !== removeIndex
    );
    console.log("newFollowedCities", newFollowedCities);

    setFollowedCities(newFollowedCities);
    await AsyncStorage.setItem(
      "@weatherForecast",
      JSON.stringify({
        language: language,
        tempUnit: tempUnit,
        followedCities: newFollowedCities,
      })
    );
    Alert.alert(dataStore?.followedCities[removeIndex]);
  };

  return (
    <SubScreenLayout title={translate(language).manageCities}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchCity")}
          activeOpacity={1}
        >
          <View style={styles.searchInput}>
            <Ionicons name="search" size={22} color="gray" />
            <Text style={{ color: "gray", fontSize: 16, marginLeft: 18 }}>
              {translate(language).enterLocation}
            </Text>
          </View>
        </TouchableOpacity>

        {followedWeathers.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 16, marginHorizontal: -16 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          >
            <FollowedCityItem
              city_name={followedWeathers[0].city_name}
              temp_max={followedWeathers[0].current.main.temp_max}
              temp_min={followedWeathers[0].current.main.temp_min}
              current_temp={followedWeathers[0].current.main.temp}
            />
            <Accordion
              sections={[...followedWeathers].slice(1, followedWeathers.length)}
              activeSections={activeSections}
              onChange={_updateSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              underlayColor="rgba(0, 0, 0, 0.0)"
            />
          </ScrollView>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </SubScreenLayout>
  );
};
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ManageCitiesScreen;
