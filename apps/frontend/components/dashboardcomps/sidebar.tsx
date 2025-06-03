"use client";

import { Home, Settings, TrendingUp, Users, Video } from "lucide-react";
import React from "react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "rooms", label: "Rooms", icon: Video },
  { id: "participants", label: "Participants", icon: Users },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <nav className="flex-1 p-4 space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar;
