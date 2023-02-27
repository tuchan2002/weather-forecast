import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface HomeHeaderProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const HomeHeader = ({ navigation }: HomeHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 12,
  },
});
export default HomeHeader;
