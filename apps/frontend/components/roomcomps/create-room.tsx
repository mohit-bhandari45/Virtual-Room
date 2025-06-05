"use client";

import { IRoomData, valueChecks } from "@/app/rooms/utils";
import { useAppContext } from "@/context/AppContext";
import { Globe, Lock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import Processing from "../loaders/processing-loader";
import api, { CREATE_ROOM } from "@/api/api";

const CreateRoom = () => {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const { loader, setLoader } = useAppContext();

  const [roomData, setRoomData] = useState<IRoomData>({
    name: "",
    description: "",
    duration: 0,
    // participants: "",
    type: "",
    privacy: "public", // Default to public
  });

  const handleCreateRoom = async () => {
    // checks
    const returned = valueChecks(roomData);
    if (!returned.status) {
      toast.error(returned.msg);
      return;
    }

    setLoader(true);

    try {
      const data = {
        name: roomData.name,
        description: roomData.description,
        duration: Number(roomData.duration),
        isPublic: roomData.privacy,
      };

      const response = await api.post(CREATE_ROOM, data);
    //   const id = response.data.data;

      if(response.status===201){
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsCreateRoomOpen(false);
      setRoomData({
        name: "",
        description: "",
        duration: 0,
        //   participants: "",
        type: "",
        privacy: "public",
      });
    }
  };

  return (
    <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {loader && (
          <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center rounded-md">
            <Processing msg="Creating room..." />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            Set up a new room for collaboration, meetings, or focus sessions.
          </DialogDescription>
        </DialogHeader>
        <div
          className={`grid gap-4 py-4 transition-opacity ${loader ? "opacity-40 pointer-events-none" : ""}`}
        >
          <div className="grid gap-2">
            <Label htmlFor="room-name">Room Name *</Label>
            <Input
              id="room-name"
              placeholder="e.g., Team Standup, Focus Session"
              value={roomData.name}
              onChange={(e) =>
                setRoomData({ ...roomData, name: e.target.value })
              }
              required
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
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="room-duration">Duration (in hrs)</Label>
              <Input
                id="room-duration"
                type="number"
                placeholder="e.g., 1, 2, 3"
                min={1}
                max={24}
                step={1}
                value={roomData.duration}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    duration: e.target.value as unknown as number,
                  })
                }
                required
              />
            </div>
          </div>
          {/* <div className="grid gap-2">
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
                <SelectItem value="presentation">Presentation Room</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Privacy Settings */}
          <div className="grid gap-3">
            <Label>Room Privacy</Label>
            <RadioGroup
              value={roomData.privacy}
              onValueChange={(value) =>
                setRoomData({ ...roomData, privacy: value })
              }
              className="grid grid-cols-2 gap-4"
              required
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
          <Button variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateRoom}
            disabled={
              !roomData.name || !roomData.description || roomData.duration === 0
            }
          >
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
