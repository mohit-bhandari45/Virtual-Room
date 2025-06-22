"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";

type PeerContextType = {
  peer: RTCPeerConnection;
  handleCreateOffer: () => Promise<RTCSessionDescriptionInit>;
  handleCreateAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit>;
  handleSetRemoteAnswer: (offer: RTCSessionDescriptionInit) => void;
  sendStream: (stream: MediaStream | null) => void;
  remoteStream: MediaStream | null;
};

const PeerContext = React.createContext<PeerContextType | null>(null);

type PeerProviderProps = {
  children: ReactNode;
};

export const PeerProvider = (props: PeerProviderProps) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
      },
    ],
  });

  const handleCreateOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const handleCreateAnswer = async (offer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(offer);
    const ans = await peer.createAnswer();
    await peer.setLocalDescription(ans);
    return ans;
  };

  const handleSetRemoteAnswer = async (ans: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream: MediaStream | null) => {
    if(!stream) return;
    
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
  };

  const handleTrackEvent = useCallback((event) => {
    setRemoteStream(event.streams[0]);
  }, []);

  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [handleTrackEvent, peer]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        handleCreateOffer,
        handleCreateAnswer,
        handleSetRemoteAnswer,
        sendStream,
        remoteStream,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};

export const usePeer = (): PeerContextType => {
  const context = React.useContext(PeerContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider.");
  }
  return context;
};

export default PeerContext;
