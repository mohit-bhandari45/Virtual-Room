import { AppProvider } from "@/context/AppContext";
import { PeerProvider } from "@/context/PeerContext";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";

export const metadata: Metadata = {
  title: "VirtRoom",
  description: "Ultimate Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster />
        <PeerProvider>
          <AppProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </AppProvider>
        </PeerProvider>
      </body>
    </html>
  );
}
