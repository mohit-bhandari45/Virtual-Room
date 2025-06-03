"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Bell,
    Clock,
    LogOut,
    Plus,
    Search,
    Settings,
    Sparkles,
    TrendingUp,
    User,
    Users,
    Video
} from "lucide-react";
import { useState } from "react";

const MainDashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const recentRooms = [
    {
      id: "1",
      name: "Team Standup",
      participants: 8,
      status: "active",
      created: "2 hours ago",
      type: "meeting",
      isPublic: false,
    },
    {
      id: "2",
      name: "Product Demo",
      participants: 15,
      status: "scheduled",
      created: "1 day ago",
      type: "presentation",
      isPublic: true,
    },
    {
      id: "3",
      name: "Code Review Session",
      participants: 5,
      status: "ended",
      created: "3 days ago",
      type: "collaboration",
      isPublic: false,
    },
    {
      id: "4",
      name: "Client Meeting",
      participants: 3,
      status: "active",
      created: "1 hour ago",
      type: "meeting",
      isPublic: false,
    },
  ];

  const stats = [
    { label: "Total Rooms", value: "24", change: "+12%", icon: Video },
    { label: "Active Users", value: "156", change: "+8%", icon: Users },
    { label: "Hours Hosted", value: "89", change: "+23%", icon: Clock },
    { label: "This Week", value: "12", change: "+5%", icon: TrendingUp },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "ended":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">VirtualRooms</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-400">
                      john@example.com
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-white/20">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">MainDashBoard</h1>
                <p className="text-gray-400 mt-1">
                  Manage your virtual rooms and participants
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                  />
                </div>

                {/* Notifications */}
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Bell className="w-4 h-4" />
                </Button>

                {/* Create Room */}
                <Button className="bg-white hover:bg-gray-100 text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Room
                </Button>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;