// app/dashboard/layout.tsx
import React from "react";
import { SocketProvider } from "@/context/SocketContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}
