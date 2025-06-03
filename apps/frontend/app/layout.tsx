import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
