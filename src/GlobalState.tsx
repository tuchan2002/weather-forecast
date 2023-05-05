import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";

interface IDataContextProps {
  children: ReactNode;
}

export interface IDataContextDefault {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  tempUnit: string;
  setTempUnit: React.Dispatch<React.SetStateAction<string>>;
  followedCities: string[];
  setFollowedCities: React.Dispatch<React.SetStateAction<string[]>>;
  currentCity: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<IDataContextDefault>(
  {} as IDataContextDefault
);

export default function DataProvider({ children }: IDataContextProps) {
  const [followedCities, setFollowedCities] = useState<string[]>([]);
  const [language, setLanguage] = useState("en");
  const [tempUnit, setTempUnit] = useState("metric");
  const [currentCity, setCurrentCity] = useState<string>("");

  useEffect(() => {
    const setGlobalState = async () => {
      try {
        // await AsyncStorage.setItem(
        //   "@weatherForecast",
        //   JSON.stringify({
        //     language: "en",
        //     tempUnit: "metric",
        //     followedCities: [],
        //   })
        // );

        // set app setting
        const globalStateJson = await AsyncStorage.getItem("@weatherForecast");
        const globalState = JSON.parse(globalStateJson || "");

        setLanguage(globalState.language);
        setTempUnit(globalState.tempUnit);
        setFollowedCities(globalState.followedCities);
      } catch (error) {
        console.log(error);
      }
    };

    setGlobalState();
  }, []);

  const contextData = {
    language,
    setLanguage,
    tempUnit,
    setTempUnit,
    followedCities,
    setFollowedCities,
    currentCity,
    setCurrentCity,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
}
