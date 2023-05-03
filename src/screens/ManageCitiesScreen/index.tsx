import { Button } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { CustomForecast } from "../../types/response/CustomForecast";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFullWeatherByCityName } from "../../utils/methods";
import { translate } from "../../locales";
import FollowedCitiesList from "../../components/ManageCitiesScreen/FollowedCitiesList";

const ManageCitiesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { currentCity, language, tempUnit, followedCities } = dataStore;

  const [followedWeathers, setFollowedWeathers] = useState<CustomForecast[]>(
    []
  );

  useEffect(() => {
    const fetchFollowedWeathers = async () => {
      const allOfCitiesArray = currentCity
        ? [currentCity, ...followedCities]
        : [...followedCities];

      const followedWeathersPromiseArray = allOfCitiesArray.map(
        (followedCity) =>
          getFullWeatherByCityName(followedCity, language, tempUnit)
      );

      const followedWeathersArray: CustomForecast[] = await Promise.all(
        followedWeathersPromiseArray
      );
      setFollowedWeathers([...followedWeathersArray]);
    };
    fetchFollowedWeathers();
  }, [followedCities]);

  return (
    <SubScreenLayout title={translate(language).manageCities}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchCity")}
          activeOpacity={1}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search" size={22} color="gray" />
            <Text style={{ color: "gray", fontSize: 16, marginLeft: 18 }}>
              {translate(language).enterLocation}
            </Text>
          </View>
        </TouchableOpacity>

        {followedWeathers.length > 0 ? (
          <FollowedCitiesList followedWeathers={followedWeathers} />
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
  searchBar: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ManageCitiesScreen;
