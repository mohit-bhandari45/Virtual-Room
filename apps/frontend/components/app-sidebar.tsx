"use client";

import {
  Calendar,
  Frame,
  Home,
  Layers2,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  name: "VirtRoom",
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: false,
    },
    {
      title: "My Rooms",
      url: "/dashboard/rooms",
      icon: Layers2,
      isActive: false,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: Calendar,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: false,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher name={data.name} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
