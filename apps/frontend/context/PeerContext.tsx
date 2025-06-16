"use client";

import React, { ReactNode } from "react";

type PeerContextType = {
  peer: RTCPeerConnection | void;
  handleCreateOffer: () => Promise<RTCSessionDescriptionInit>;
  handleCreateAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit>;
  handleSetRemoteAnswer: (
    offer: RTCSessionDescriptionInit
  ) => void;
};

const PeerContext = React.createContext<PeerContextType | null>(null);

type PeerProviderProps = {
  children: ReactNode;
};

export const PeerProvider = (props: PeerProviderProps) => {
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

  return (
    <PeerContext.Provider
      value={{
        peer,
        handleCreateOffer,
        handleCreateAnswer,
        handleSetRemoteAnswer,
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
