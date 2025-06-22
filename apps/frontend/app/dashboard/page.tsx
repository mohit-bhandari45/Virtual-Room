"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainLoader from "@/components/loaders/mainLoader";
import CreateRoom from "@/components/roomcomps/create-room";
import JoinRoom from "@/components/roomcomps/join-room";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useGetProfile from "@/hooks/useGetProfile";
import useGetRooms from "@/hooks/useGetRooms";
import {
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Flame,
  Target,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { GetStreakReturnValue, getStreaks } from "./utils";
import { useEffect, useState } from "react";

export default function Page() {
  const { loader: profileLoader, profile } = useGetProfile();
  const { loader: roomLoader, rooms } = useGetRooms();
  const [streakData, setStreakData] = useState<GetStreakReturnValue>({
    maxStreak: 0,
    currentStreak: 0,
  });

  // Mock data for demonstration
  const recentRooms = [
    {
      id: 1,
      name: "Team Standup",
      description: "Daily sync meeting",
      date: "Today",
      time: "9:00 AM",
      participants: 5,
      status: "upcoming",
      tag: "Today",
    },
    {
      id: 2,
      name: "Project Planning",
      description: "Q4 roadmap discussion",
      date: "Tomorrow",
      time: "2:00 PM",
      participants: 8,
      status: "scheduled",
      tag: "This Week",
    },
    {
      id: 3,
      name: "Code Review Session",
      description: "Frontend components review",
      date: "Dec 15",
      time: "3:30 PM",
      participants: 3,
      status: "completed",
      tag: "Past",
    },
  ];

  const recentActivity = [
    "You joined Room 'Team Standup'",
    "You spent 45 mins in Focus mode",
    "You shared a file in Room 'Project Planning'",
    "You completed a 2-hour focus session",
  ];

  const sharedResources = [
    { name: "Design_System_v2.pdf", room: "Team Standup", date: "2 hours ago" },
    { name: "Q4_Roadmap.docx", room: "Project Planning", date: "1 day ago" },
    { name: "Whiteboard_Notes.png", room: "Code Review", date: "3 days ago" },
  ];

  const upcomingEvents = [
    { date: "Today", time: "9:00 AM", title: "Team Standup" },
    { date: "Tomorrow", time: "2:00 PM", title: "Project Planning" },
    { date: "Dec 18", time: "10:00 AM", title: "Client Review" },
  ];

  useEffect(() => {
    if (rooms) {
      const data = getStreaks(rooms);
      setStreakData(data);
    }
  }, [rooms]);

  if (profileLoader || roomLoader || !rooms || !profile) {
    return <MainLoader msg={"Wait a min!"} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
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
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Welcome Section & Create Room */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.name}!
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your rooms and sessions
              </p>
            </div>

            {/* Create Room Dialog */}
            <div className="flex gap-5">
              <JoinRoom />
              <CreateRoom />
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Rooms
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rooms.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Focus Time
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-6">
                  {/* Current Streak */}
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold">{streakData.currentStreak}</div>
                    <p className="text-xs text-muted-foreground">Days active</p>
                  </div>

                  {/* Separator */}
                  <div className="h-13 text-6xl font-light relative bottom-1">
                    /
                  </div>

                  {/* Max Streak */}
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold">{streakData.maxStreak}</div>
                    <p className="text-xs text-muted-foreground">Max streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Sessions today</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your Rooms / Sessions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Your Rooms / Sessions
                  </CardTitle>
                  <CardDescription>Recent and scheduled rooms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentRooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{room.name}</h4>
                          <Badge
                            variant={
                              room.tag === "Today"
                                ? "default"
                                : room.tag === "This Week"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {room.tag}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {room.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {room.date} at {room.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {room.participants} participants
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          {room.status === "upcoming"
                            ? "Join"
                            : room.status === "scheduled"
                              ? "Edit"
                              : "View"}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full justify-between">
                    View all rooms
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Calendar / Schedule & User Profile */}
            <div className="space-y-6">
              {/* User Profile Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Focus Score</span>
                      <span className="text-sm font-semibold">85/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Streak</span>
                      <span className="text-sm font-semibold">7 days</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Mini Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg border"
                    >
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-muted-foreground">
                          {event.date}
                        </div>
                        <div className="text-sm font-semibold">
                          {event.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{event.title}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Activity Feed & Shared Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg border-l-2 border-primary/20 bg-muted/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between mt-4">
                  View all activity
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Shared Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Shared Resources
                </CardTitle>
                <CardDescription>
                  Recently shared files and documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sharedResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          {resource.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {resource.room} • {resource.date}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between mt-4">
                  View all resources
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
