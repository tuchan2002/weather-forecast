import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar, Text } from "@rneui/themed";
import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CustomForecastBlock,
  CustomForecastSearchCity,
} from "../../types/response/CustomForecast";
import { getCityByCityName, getWeatherFiveDayByCity } from "../../utils/apis";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { translate } from "../../locales";
import SearchResult from "../../components/SearchCityScreen/SearchResult";
import styles from "./search-city-style";

const SearchCityScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { language, tempUnit } = dataStore;

  const [cityNameSearch, setCityNameSearch] = useState("");
  const [searchedForecastWeather, setSearchedForecastWeather] = useState<
    CustomForecastSearchCity[]
  >([]);
  const [loading, setLoading] = useState(false);
  const searchBarEl = useRef<any>(null);

  const updateCityNameSearch = (cityNameSearch: string) => {
    if (!cityNameSearch.trim()) {
      setSearchedForecastWeather([]);
    }
    setCityNameSearch(cityNameSearch);
  };

  const handleSubmitSearchBar = async () => {
    if (!cityNameSearch.trim()) {
      return;
    }

    setLoading(true);
    const city = await getCityByCityName(cityNameSearch);

    if (city.length === 0) {
      setLoading(false);
      return;
    }

    const fiveDayForecastWeather: CustomForecastBlock[] =
      await getWeatherFiveDayByCity(
        city[0].lat,
        city[0].lon,
        language,
        tempUnit
      );

    setLoading(false);

    setSearchedForecastWeather([
      {
        city_name: city[0].name,
        hourly: fiveDayForecastWeather,
        daily: fiveDayForecastWeather.filter((_, index) => index % 8 === 0),
      },
    ]);
  };

  const renderSearchResults = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (searchedForecastWeather.length === 0) {
      return (
        <View style={styles.noResultsWrapper}>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {translate(language).noResults}
          </Text>
        </View>
      );
    } else if (searchedForecastWeather.length > 0) {
      return <SearchResult searchedForecastWeather={searchedForecastWeather} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.container}>
        <SearchBar
          placeholder={translate(language).enterLocation}
          onChangeText={updateCityNameSearch}
          value={cityNameSearch}
          platform="android"
          containerStyle={styles.searchBarContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          ref={searchBarEl}
          onSubmitEditing={handleSubmitSearchBar}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ManageCities")}
          activeOpacity={1}
        >
          <Text style={styles.cancelButton}>{translate(language).cancel}</Text>
        </TouchableOpacity>
      </View>
      {renderSearchResults()}
    </View>
  );
};

export default SearchCityScreen;
