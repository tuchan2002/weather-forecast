import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import GlobalStyles from "../../utils/GlobalStyles";

const HomeMain = () => {
  return (
    <View style={styles.main}>
      <Text style={{ marginBottom: 6, color: "white" }}>New York</Text>
      <Text style={{ marginBottom: 6, color: "white" }}>Sun, 26 December</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: "https://openweathermap.org/img/wn/01d@2x.png",
          }}
        />
        <Text style={{ color: "white", fontSize: 60 }}>18°</Text>
      </View>
      <Text style={{ marginBottom: 6, color: "white", fontSize: 18 }}>
        Feels like 20°
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          textTransform: "capitalize",
          marginBottom: 6,
        }}
      >
        clear sky
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginVertical: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="sunrise" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 6,
            }}
          >
            07:19
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="sunset" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 6,
            }}
          >
            16:50
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
export default HomeMain;
