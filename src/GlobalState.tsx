import axios from "axios";
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
}

export const DataContext = createContext<IDataContextDefault>(
  {} as IDataContextDefault
);

export default function DataProvider({ children }: IDataContextProps) {
  const [followedCities, setFollowedCities] = useState([
    "ha noi",
    "greenland",
    "ho chi minh",
    "tokyo",
    "new york",
  ]);
  const [language, setLanguage] = useState("en");
  const [tempUnit, setTempUnit] = useState("metric");

  const contextData = {
    language,
    setLanguage,
    tempUnit,
    setTempUnit,
    followedCities,
    setFollowedCities,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
}
