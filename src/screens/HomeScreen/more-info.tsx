import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

interface MoreInfoProps {
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  clouds: number;
  uvi: number;
}
const MoreInfo = ({
  humidity,
  wind_speed,
  visibility,
  pressure,
  clouds,
  uvi,
}: MoreInfoProps) => {
  return (
    <View style={styles.basicInfo}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="water-outline" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            Humidity
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>{`${humidity} %`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="speedometer-outline" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            Pressure
          </Text>
        </View>
        <Text
          style={{ color: "white", fontSize: 16 }}
        >{`${pressure} hPa`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="wind" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            Wind Speed
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>{`${Math.round(
          wind_speed * 3.6
        )} Km/s`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="cloud" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            Cloud
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>{`${clouds} %`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="eye" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            Visibility
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>{`${
          visibility / 1000
        } Km`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="cloud" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 6 }}>
            UV Index
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>{uvi}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basicInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 24,
    padding: 24,
    marginBottom: 12,
  },
});

export default MoreInfo;
