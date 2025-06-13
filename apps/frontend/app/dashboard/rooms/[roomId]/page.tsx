"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Room = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      
    };

    init();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="border rounded w-full max-w-md"
      ></video>
    </div>
  );
};

export default Room;
