"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainLoader from "@/components/loaders/mainLoader";
import Tab from "@/components/roomcomps/room";
import RoomCard from "@/components/roomcomps/RoomCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useGetProfile from "@/hooks/useGetProfile";
import useGetRooms from "@/hooks/useGetRooms";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";

const Rooms = () => {
  const { loader: profileLoader, profile } = useGetProfile();
  const { loader: roomLoader, rooms } = useGetRooms();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">(
    "all"
  );

  if (profileLoader || roomLoader || !rooms || !profile) {
    return <MainLoader msg={"Wait a min!"} />;
  }

  const activeRooms = rooms.filter((room) => room.active);
  const inactiveRooms = rooms.filter((room) => !room.active);

  const getFilteredRooms = () => {
    if (activeTab === "active") return activeRooms;
    if (activeTab === "inactive") return inactiveRooms;
    return rooms;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Rooms</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-6 w-full">
          <div className="flex space-x-4 mb-6">
            <Tab
              label="All Rooms"
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            />
            <Tab
              label="Active"
              active={activeTab === "active"}
              onClick={() => setActiveTab("active")}
            />
            <Tab
              label="Inactive"
              active={activeTab === "inactive"}
              onClick={() => setActiveTab("inactive")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredRooms().map((room) => (
              <RoomCard key={room.id} room={room} userId={profile.id}/>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Rooms;
