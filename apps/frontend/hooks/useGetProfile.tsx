"use client";

import api, { GET_OWN_DASHBOARD } from "@/apis/api";
import { IUser } from "@virtualroom/types";
import { useEffect, useState } from "react";

const useGetProfile = () => {
  const [loader, setLoader] = useState(true);
  const [profile, setProfile] = useState<IUser | null>(null);
  
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get(GET_OWN_DASHBOARD);
        setProfile(res.data.data); // assuming response structure is { data: { ... } }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoader(false);
      }
    };

    getUserProfile();
  }, []);

  return { profile, loader };
};

export default useGetProfile;
