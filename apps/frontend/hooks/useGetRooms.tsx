"use client";

import api, { GET_ALL_ROOM } from "@/api/api";
import { useEffect, useState } from "react";
import { IRoom } from "@virtualroom/types";

const useGetRooms = () => {
  const [loader, setLoader] = useState(true);
  const [rooms, setRooms] = useState<IRoom[] | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get(GET_ALL_ROOM);
        setRooms(res.data.data); // assuming response structure is { data: { ... } }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoader(false);
      }
    };

    getUserProfile();
  }, []);

  return { rooms, loader };
};

export default useGetRooms;
