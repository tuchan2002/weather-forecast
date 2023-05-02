import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { CustomForecastSearchCity } from "../../types/response/CustomForecast";
import moment from "moment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { translate } from "../../locales";

const chartConfig = {
  backgroundColor: "#f2f2f2",
  backgroundGradientFrom: "#f2f2f2",
  backgroundGradientTo: "#f2f2f2",
  fillShadowGradientFrom: "#000",
  fillShadowGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const CityDetail = ({
  route,
}: {
  route: RouteProp<{
    params: { searchedForecastWeather: CustomForecastSearchCity[] };
  }>;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { followedCities, setFollowedCities, currentCity, language } =
    dataStore;

  const { searchedForecastWeather } = route.params;

  const data = {
    labels: searchedForecastWeather[0].hourly.map((item) =>
      moment.unix(item.dt).format("HH:mm")
    ),
    datasets: [
      {
        data: searchedForecastWeather[0].hourly.map((item) => item.main.temp),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SubScreenLayout title={searchedForecastWeather[0].city_name}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 16 }}>
          {`⬤  ${translate(language).temperature}`}
        </Text>
        <View style={{ height: 310 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={data}
              width={data.labels.length * (Dimensions.get("window").width / 8)}
              height={280}
              chartConfig={chartConfig}
              style={{
                marginHorizontal: -12,
              }}
              fromZero={true}
              yAxisSuffix="°"
            />
          </ScrollView>
        </View>

        {[currentCity, ...followedCities].includes(
          searchedForecastWeather[0].city_name
        ) && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginBottom: 12 }}
            >
              <AntDesign name="rightcircle" size={46} color="#000" />
            </TouchableOpacity>
            <Text>{translate(language).viewOnHomeScreen}</Text>
          </View>
        )}
      </View>
    </SubScreenLayout>
  );
};

export default CityDetail;
