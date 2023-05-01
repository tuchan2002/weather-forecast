import { StyleSheet, Text, View } from "react-native";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { useContext, useState } from "react";
import { CheckBox, Button } from "@rneui/themed";
import SubScreenLayout from "../../layouts/SubScreenLayout";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translate } from "../../locales";

const temperatureUnitOptions = [
  { text: "C", value: "metric" },
  { text: "F", value: "imperial" },
];
const languageOptions = [
  { text: "English", value: "en" },
  { text: "Tiếng Việt", value: "vi" },
  { text: "日本語", value: "ja" },
];
const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dataStore = useContext<IDataContextDefault>(DataContext);
  const { setLanguage, setTempUnit, followedCities, language } = dataStore;

  const [currentLanguage, setCurrentLanguage] = useState(dataStore.language);
  const [currentTempUnit, setCurrentTempUnit] = useState(dataStore.tempUnit);

  const handleSubmit = async () => {
    setLanguage(currentLanguage);
    setTempUnit(currentTempUnit);
    await AsyncStorage.setItem(
      "@weatherForecast",
      JSON.stringify({
        language: currentLanguage,
        tempUnit: currentTempUnit,
        followedCities: followedCities,
      })
    );

    navigation.navigate("Home");
  };

  return (
    <SubScreenLayout title={translate(language).settings}>
      <View style={styles.checkBoxGroup}>
        <Text style={{ marginBottom: 12, fontSize: 18 }}>
          {translate(language).tempUnit}
        </Text>
        {temperatureUnitOptions.map((tempUnitOption) => (
          <CheckBox
            key={tempUnitOption.value}
            style={{ marginBottom: 20 }}
            checked={currentTempUnit === tempUnitOption.value}
            textStyle={{
              textDecorationLine: "none",
            }}
            title={tempUnitOption.text}
            onPress={() => setCurrentTempUnit(tempUnitOption.value)}
          />
        ))}
      </View>

      <View style={styles.checkBoxGroup}>
        <Text style={{ marginBottom: 12, fontSize: 18 }}>
          {translate(language).language}
        </Text>
        {languageOptions.map((langOption) => (
          <CheckBox
            key={langOption.value}
            style={{ marginBottom: 20 }}
            checked={currentLanguage === langOption.value}
            textStyle={{
              textDecorationLine: "none",
            }}
            title={langOption.text}
            onPress={() => setCurrentLanguage(langOption.value)}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title={translate(language).cancel}
          type="outline"
          containerStyle={{ flexGrow: 1, marginRight: 16 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Button
          title={translate(language).save}
          color="#2196F3"
          containerStyle={{ flexGrow: 1 }}
          onPress={handleSubmit}
        />
      </View>
    </SubScreenLayout>
  );
};
const styles = StyleSheet.create({
  checkBoxGroup: {
    marginBottom: 20,
  },
});
export default SettingsScreen;
