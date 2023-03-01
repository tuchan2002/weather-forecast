import axios from "axios";
import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";

interface IDataContextProps {
  children: ReactNode;
}

interface IDataContextDefault {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  tempUnit: string;
  setTempUnit: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<IDataContextDefault | null>(null);

export default function DataProvider({ children }: IDataContextProps) {
  const [language, setLanguage] = useState("en");
  const [tempUnit, setTempUnit] = useState("metric");

  const contextData = {
    language,
    setLanguage,
    tempUnit,
    setTempUnit,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
}
