"use client";

import { usePeer } from "@/context/PeerContext";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Room = () => {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { peer, handleCreateOffer, handleCreateAnswer, handleSetRemoteAnswer } =
    usePeer();

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected with id!", socket.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUserJoined = async (data: any) => {
      const { emailId } = data;
      console.log("New User Joined:", emailId);

      const offer = await handleCreateOffer();
      console.log("Offer Created: ", offer);
      socket.emit("call-user", { emailId, sdp: offer });
    };

    const handleAcceptCall = async (data: any) => {
      const { ans } = data;
      console.log("Got Ans", ans);

      handleSetRemoteAnswer(ans);
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", async (data) => {
      console.log("Got Call");
      const { from, sdp: offer } = data;

      const ans = await handleCreateAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    });
    socket.on("call-accepted", handleAcceptCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("call-accepted", handleAcceptCall);
    };
  }, [handleCreateAnswer, handleCreateOffer, handleSetRemoteAnswer, socket]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="border rounded w-full max-w-md"
      ></video>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        muted
        className="border rounded w-full max-w-md"
      ></video>
    </div>
  );
};

export default Room;
