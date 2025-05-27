"use client";

import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import FloatingCard from "./FloatingCard";

interface NavbarProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isVisible, setIsVisible }: NavbarProps) => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setIsVisible]);

  return (
    <FloatingCard isVisible={isVisible} delay={100}>
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold">VirtRoom</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105">
            Sign In
          </button>
        </div>
      </nav>
    </FloatingCard>
  );
};

export default Navbar;
