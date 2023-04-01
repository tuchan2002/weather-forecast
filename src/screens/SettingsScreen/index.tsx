import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { DataContext, IDataContextDefault } from "../../GlobalState";
import { useContext, useState } from "react";
import { CheckBox, Button } from "@rneui/themed";

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
  const dataStore = useContext<IDataContextDefault>(DataContext);

  const [currentLanguage, setCurrentLanguage] = useState(dataStore.language);
  const [currentTempUnit, setCurrentTempUnit] = useState(dataStore.tempUnit);

  console.log("RE_RENDER", currentLanguage, currentTempUnit);

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <View style={styles.checkBoxGroup}>
        <Text style={{ marginBottom: 12, fontSize: 18 }}>Temperature Unit</Text>
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
        <Text style={{ marginBottom: 12, fontSize: 18 }}>Language</Text>
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

      <Button
        onPress={() => {}}
        title="Save"
        color="#2196F3"
        style={{ marginHorizontal: 20, alignSelf: "flex-end" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
  },
  checkBoxGroup: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
export default SettingsScreen;
