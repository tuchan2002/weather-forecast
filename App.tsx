import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen/index";
import SettingScreen from "./src/screens/SettingsScreen/index";
import DataProvider from "./src/GlobalState";
import ManageCitiesScreen from "./src/screens/ManageCitiesScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageCities"
              component={ManageCitiesScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </SafeAreaProvider>
  );
}
