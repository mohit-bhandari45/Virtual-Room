"use client";

import React, { ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
};

const SocketContext = React.createContext<SocketContextType | null>(null);

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketProvider = (props: SocketProviderProps) => {
  const socket = React.useMemo(
    () =>
      io("http://localhost:4000", {
        auth: { token: localStorage.getItem("token") },
      }),
    []
  );

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider.");
  }
  return context;
};

export default SocketContext;
