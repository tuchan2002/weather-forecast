import { ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./src/screens/HomeScreen/index";
import SettingsScreen from "./src/screens/SettingsScreen/index";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
              <Tab.Screen
                name="ホーム"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome name="home" size={28} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="設定"
                component={SettingsScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome name="gear" size={28} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
