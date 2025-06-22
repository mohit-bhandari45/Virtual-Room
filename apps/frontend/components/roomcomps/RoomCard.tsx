"use client";
import { Button } from "@/components/ui/button";
import { IRoom } from "@virtualroom/types";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  room: IRoom;
  userId?: string; // current logged-in user ID (optional)
  onStopRoom?: (roomId: string) => void; // optional callback
}

const RoomCard = ({ room, userId, onStopRoom }: RoomCardProps) => {
  const router = useRouter();

  const handleStopRoom = () => {
    if (onStopRoom) {
      onStopRoom(room.id);
    } else {
      // fallback logic
      console.log(`Stopping room: ${room.name}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 transition relative">
      {/* Join Now Button */}
      {room.active && (
        <Button
          size="sm"
          className="absolute top-3 right-3 text-xs"
          onClick={() => router.push(`/join/${room.id}`)}
        >
          Join Now
        </Button>
      )}

      <h3 className="text-lg font-semibold text-gray-800 pr-16">{room.name}</h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {room.description}
      </p>

      <div className="text-xs text-gray-500 mt-3 space-y-1">
        <p>
          <span className="font-medium">Public:</span>{" "}
          {room.isPublic ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {room.duration} min
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(room.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Stop Room Button */}
      {room.active && userId === room.createdById && (
        <Button
          variant="destructive"
          size="sm"
          className="mt-4 w-full"
          onClick={handleStopRoom}
        >
          Stop Room
        </Button>
      )}
    </div>
  );
};

export default RoomCard;
