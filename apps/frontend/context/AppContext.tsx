"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AppContextType = {
  loader: boolean;
  mainLoader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  setMainLoader: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loader, setLoader] = useState<boolean>(false);
  const [mainLoader, setMainLoader] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ loader, setLoader, mainLoader, setMainLoader }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
