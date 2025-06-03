"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainLoader from "@/components/mainLoader";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import useGetProfile from "@/hooks/useGetProfile";
import {
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Flame,
  Globe,
  Lock,
  Plus,
  Target,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { loader, profile, error } = useGetProfile();

  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    participants: "",
    type: "",
    privacy: "public", // Default to public
  });

  const handleCreateRoom = () => {
    // Handle room creation logic here
    console.log("Creating room:", roomData);
    // You can add API call here
    setIsCreateRoomOpen(false);
    // Reset form
    setRoomData({
      name: "",
      description: "",
      date: "",
      time: "",
      participants: "",
      type: "",
      privacy: "public",
    });
  };
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

  if (loader) {
    return <MainLoader msg={"Wait a min!"} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar profile={profile}/>
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
              <h1 className="text-3xl font-bold">Welcome back, {profile?.name}!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your rooms and sessions
              </p>
            </div>

            {/* Create Room Dialog */}
            <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Room</DialogTitle>
                  <DialogDescription>
                    Set up a new room for collaboration, meetings, or focus
                    sessions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="room-name">Room Name *</Label>
                    <Input
                      id="room-name"
                      placeholder="e.g., Team Standup, Focus Session"
                      value={roomData.name}
                      onChange={(e) =>
                        setRoomData({ ...roomData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="room-description">Description</Label>
                    <Textarea
                      id="room-description"
                      placeholder="Brief description of the room purpose..."
                      value={roomData.description}
                      onChange={(e) =>
                        setRoomData({
                          ...roomData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="room-date">Date</Label>
                      <Input
                        id="room-date"
                        type="date"
                        value={roomData.date}
                        onChange={(e) =>
                          setRoomData({ ...roomData, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room-time">Time</Label>
                      <Input
                        id="room-time"
                        type="time"
                        value={roomData.time}
                        onChange={(e) =>
                          setRoomData({ ...roomData, time: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select
                      value={roomData.type}
                      onValueChange={(value) =>
                        setRoomData({ ...roomData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting Room</SelectItem>
                        <SelectItem value="focus">Focus Session</SelectItem>
                        <SelectItem value="collaboration">
                          Collaboration Space
                        </SelectItem>
                        <SelectItem value="presentation">
                          Presentation Room
                        </SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Privacy Settings */}
                  <div className="grid gap-3">
                    <Label>Room Privacy</Label>
                    <RadioGroup
                      value={roomData.privacy}
                      onValueChange={(value) =>
                        setRoomData({ ...roomData, privacy: value })
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="public" id="public" />
                        <div className="flex-1">
                          <Label
                            htmlFor="public"
                            className="flex items-center gap-2 font-medium cursor-pointer"
                          >
                            <Globe className="h-4 w-4 text-green-600" />
                            Public Room
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Anyone can discover and join this room
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="private" id="private" />
                        <div className="flex-1">
                          <Label
                            htmlFor="private"
                            className="flex items-center gap-2 font-medium cursor-pointer"
                          >
                            <Lock className="h-4 w-4 text-orange-600" />
                            Private Room
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Only invited participants can join
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  {/* <div className="grid gap-2">
                    <Label htmlFor="participants">Invite Participants (Email addresses)</Label>
                    <Input
                      id="participants"
                      placeholder="user1@example.com, user2@example.com"
                      value={roomData.participants}
                      onChange={(e) => setRoomData({...roomData, participants: e.target.value})}
                    />
                  </div> */}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateRoomOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRoom} disabled={!roomData.name}>
                    Create Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <div className="text-2xl font-bold">12</div>
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
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Days active</p>
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
