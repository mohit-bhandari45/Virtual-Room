import api, { GET_OWN_PROFILE } from "@/api/api";
import { useEffect, useState } from "react";
import { IUser } from "@virtualroom/types";

const useGetProfile = () => {
  const [loader, setLoader] = useState(true);
  const [profile, setProfile] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get(GET_OWN_PROFILE);
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
