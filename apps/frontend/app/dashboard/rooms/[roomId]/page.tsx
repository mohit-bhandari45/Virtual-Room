"use client";

import { usePeer } from "@/context/PeerContext";
import { useSocket } from "@/context/SocketContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Mic,MicOff,Video,VideoOff,LogOut} from "lucide-react";
import { url } from "inspector";

const Room = () => {
  const router=useRouter()
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

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

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

  // Toggle Mic
const toggleMic = () => {
  const audioTrack = myStream?.getAudioTracks()[0];
  console.log("Mic is now", audioTrack!.enabled ? "on" : "off");
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  }
};

// Toggle Camera
const toggleCam = () => {
  const videoTrack = myStream?.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled;
    setCamOn(videoTrack.enabled);
  }
};




  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black">
      
      {/* {remoteEmailId ? (
        <h1>You are connected to {remoteEmailId}</h1>
      ) : (
        <h1>No one connected</h1>
      )}

      {remoteEmailId && <Button onClick={()=>{
        sendStream(myStream);
      }}>Start sharing!</Button>} */} 
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-4xl">
        <ReactPlayer
          url={myStream as MediaStream}
          playing
          playsInline
          muted
          className="border-2 border-white rounded-lg w-full max-w-md aspect-video bg-black"
        ></ReactPlayer>
        <ReactPlayer
          url={remoteStream as MediaStream}
          playing
          muted
          playsInline
          className="border-2 border-white rounded-lg w-full max-w-md aspect-video bg-black"
        ></ReactPlayer>
      </div>

      <div className="fixed bottom-15 rounded-4xl border-2 border-white px-6 ">
        <div className="flex justify-center gap-4 p-4 bg-black bg-opacity-60 rounded-xl">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full hover:scale-105 transition ${
              micOn ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {micOn ? <Mic className="text-white" /> : <MicOff className="text-white" />}
          </button>

          <button
            onClick={toggleCam}
            className={`p-3 rounded-full hover:scale-105 transition ${
              camOn ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {camOn ? <Video className="text-white" /> : <VideoOff className="text-white" />}
          </button>

          <button
            onClick={() =>{
              alert("room left");
              router.push('/dashboard');
            }}
            className="p-3 rounded-full bg-red-700 hover:bg-red-800 transition"
          >
            <LogOut className="text-white" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Room;
