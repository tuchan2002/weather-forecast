import React, { useContext, useState } from "react";
import { Alert, ScrollView } from "react-native";
import FollowedCityItem from "./FollowedCityItem";
import Accordion from "react-native-collapsible/Accordion";
import { CustomForecast } from "../../types/response/CustomForecast";
import { Button } from "@rneui/themed";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { translate } from "../../locales";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FollowedCitiesList = ({
  followedWeathers,
}: {
  followedWeathers: CustomForecast[];
}) => {
  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { language, tempUnit, setFollowedCities, currentCity } = dataStore;

  const [activeSections, setActiveSections] = useState([]);

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
    const newFollowedCities = dataStore?.followedCities.filter(
      (_, index) => index !== removeIndex
    );

    setFollowedCities(newFollowedCities);
    await AsyncStorage.setItem(
      "@weatherForecast",
      JSON.stringify({
        language: language,
        tempUnit: tempUnit,
        followedCities: newFollowedCities,
      })
    );
    setActiveSections([]);
    Alert.alert(dataStore?.followedCities[removeIndex]);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 16, marginHorizontal: -16 }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
    >
      {currentCity && (
        <FollowedCityItem
          city_name={followedWeathers[0]?.city_name}
          temp_max={followedWeathers[0]?.current.main.temp_max}
          temp_min={followedWeathers[0]?.current.main.temp_min}
          current_temp={followedWeathers[0]?.current.main.temp}
        />
      )}

      <Accordion
        sections={
          currentCity
            ? [...followedWeathers].slice(1, followedWeathers.length)
            : [...followedWeathers]
        }
        activeSections={activeSections}
        onChange={_updateSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        underlayColor="rgba(0, 0, 0, 0.0)"
      />
    </ScrollView>
  );
};

export default FollowedCitiesList;
