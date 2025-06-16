"use client";

import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLoader from "../loaders/mainLoader";
import Processing from "../loaders/processing-loader";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JoinRoom = () => {
  const { mainLoader, setMainLoader } = useAppContext();
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const { loader } = useAppContext();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const { socket } = useSocket();

  useEffect(() => {
    setMainLoader(false);
  }, [setMainLoader]);

  const handleJoinRoom = async () => {
    socket.emit("join-room", { roomId });
    router.push(`/dashboard/rooms/${roomId}`);

    // // checks
    // // const returned = valueChecks(roomData);
    // // if (!returned.status) {
    // //   toast.error(returned.msg);
    // //   return;
    // // }

    // setLoader(true);

    // try {
    //   const data = {
    //     // name: roomData.name,
    //     // description: roomData.description,
    //     // duration: Number(roomData.duration),
    //     // isPublic: roomData.privacy,
    //     roomId,
    //   };

    //   const response = await api.post(CREATE_ROOM, data);
    //   const id = response.data.data;
    //   console.log(id);

    //   if (response.status === 201) {
    //     router.push(`/dashboard/rooms/${id}`);
    //     toast.success(response.data.msg);
    //     setMainLoader(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong");
    // } finally {
    //   setIsCreateRoomOpen(false);
    //   setRoomId("");
    // }
  };

  if (mainLoader) {
    return <MainLoader msg={"Wait a min!"} />;
  }

  return (
    <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Join Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {loader && (
          <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center rounded-md">
            <Processing msg="Creating room..." />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>Join New Room</DialogTitle>
        </DialogHeader>
        <div
          className={`grid gap-4 py-4 transition-opacity ${loader ? "opacity-40 pointer-events-none" : ""}`}
        >
          <div className="grid gap-2">
            <Label htmlFor="room-name">Room Id *</Label>
            <Input
              id="room-name"
              placeholder="e.g., abc2"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleJoinRoom}
            // disabled={
            //   !roomData.name || !roomData.description || roomData.duration === 0
            // }
          >
            Join Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
