"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainLoader from "@/components/loaders/mainLoader";
import { SidebarProvider } from "@/components/ui/sidebar";
import useGetProfile from "@/hooks/useGetProfile";
import useGetRooms from "@/hooks/useGetRooms";
import React from "react";

const Rooms = () => {
  const { loader: profileLoader, profile } = useGetProfile();
  const { loader: roomLoader, rooms } = useGetRooms();

  if (profileLoader || roomLoader || !rooms || !profile) {
    return <MainLoader msg={"Wait a min!"} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <div>Hello</div>
    </SidebarProvider>
  );
};

export default Rooms;
