import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

  const { searchedForecastWeather } = route.params;
  console.log(searchedForecastWeather);

  const data = {
    labels: searchedForecastWeather[0].daily.map((item) =>
      moment.unix(item.dt).format("ddd")
    ),
    datasets: [
      {
        data: searchedForecastWeather[0].daily.map((item) => item.main.temp),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [" Temperature"],
  };

  return (
    <SubScreenLayout title={searchedForecastWeather[0].city_name}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width}
          height={250}
          chartConfig={chartConfig}
          style={{
            marginBottom: 36,
            marginHorizontal: -16,
          }}
          fromZero={true}
          yAxisSuffix=" °"
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ marginBottom: 12 }}
          >
            <AntDesign name="rightcircle" size={36} color="#000" />
          </TouchableOpacity>
          <Text>View on Home screen</Text>
        </View>
      </View>
    </SubScreenLayout>
  );
};

export default CityDetail;
