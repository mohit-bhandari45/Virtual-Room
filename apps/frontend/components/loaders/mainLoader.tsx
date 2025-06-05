import React from "react";
import { BounceLoader } from "react-spinners";

const MainLoader = ({ msg }: { msg: string }) => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Loader container with glassmorphism effect */}
        <div className="flex items-center space-x-4 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/10 shadow-2xl">
          {/* Custom bounce loader with white color */}
          <BounceLoader 
            color="#ffffff" 
            size={40}
            speedMultiplier={0.8}
          />
          
          {/* Message with gradient text */}
          <div className="text-lg font-medium bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            {msg}
          </div>
        </div>

        {/* Optional pulsing dots indicator */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;