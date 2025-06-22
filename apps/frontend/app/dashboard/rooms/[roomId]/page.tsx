"use client";

import { usePeer } from "@/context/PeerContext";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Room = () => {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  // const [remoteEmailId, setRemoteEmailId] = useState();

  const {
    peer,
    handleCreateOffer,
    handleCreateAnswer,
    handleSetRemoteAnswer,
    sendStream,
    remoteStream,
  } = usePeer();

  useEffect(() => {
    if (!socket) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUserJoined = async (data: any) => {
      const { emailId } = data;
      console.log("New User Joined:", emailId);
      // setRemoteEmailId(emailId);

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
      // setRemoteEmailId(from);

      const ans = await handleCreateAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    });

    socket.on("call-accepted", handleAcceptCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("call-accepted", handleAcceptCall);
    };
  }, [handleCreateAnswer, handleCreateOffer, handleSetRemoteAnswer, socket]);

  // useEffect(() => {
  //   const handleNegotiation = async () => {
  //     const localOffer = peer.localDescription;
  //     socket.emit("call-user", { remoteEmailId, sdp: localOffer });
  //   };

  //   peer.addEventListener("negotiationneeded", handleNegotiation);

  //   return () => {
  //     peer.removeEventListener("negotiationneeded", handleNegotiation);
  //   };
  // }, [peer, remoteEmailId, socket]);

  useEffect(() => {
    const getUserMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      sendStream(stream);
      setMyStream(stream);
    };

    getUserMedia();
  }, [sendStream]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* {remoteEmailId ? (
        <h1>You are connected to {remoteEmailId}</h1>
      ) : (
        <h1>No one connected</h1>
      )}

      {remoteEmailId && <Button onClick={()=>{
        sendStream(myStream);
      }}>Start sharing!</Button>} */} 
      <ReactPlayer
        url={myStream as MediaStream}
        playing
        playsInline
        muted
        className="border rounded w-full max-w-md"
      ></ReactPlayer>
      <ReactPlayer
        url={remoteStream as MediaStream}
        playing
        muted
        playsInline
        className="border rounded w-full max-w-md"
      ></ReactPlayer>
    </div>
  );
};

export default Room;
