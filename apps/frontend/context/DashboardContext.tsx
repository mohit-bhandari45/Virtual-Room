"use client";

import api, { GET_OWN_DASHBOARD } from "@/apis/api";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";

type DashboardDataType = any; // Replace `any` with your actual dashboard data type
type ErrorType = any;

type DashboardContextType = {
  data: DashboardDataType | null;
  setData: Dispatch<SetStateAction<DashboardDataType | null>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  error: ErrorType | null;
  setError: Dispatch<SetStateAction<ErrorType | null>>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashboardDataType | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get(GET_OWN_DASHBOARD);
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setError(err);
      } finally {
        setLoader(false);
      }
    };

    getUserProfile();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ data, setData, loader, setLoader, error, setError }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Optional: custom hook for cleaner usage
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
};
