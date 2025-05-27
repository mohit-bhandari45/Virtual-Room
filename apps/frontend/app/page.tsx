"use client";

import CTA from "@/components/landingpagecomps/cta";
import Features from "@/components/landingpagecomps/features";
import Footer from "@/components/landingpagecomps/footer";
import HeroSection from "@/components/landingpagecomps/herosection";
import Navbar from "@/components/landingpagecomps/navbar";
import React, { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface GradientOrbProps {
  size: string;
  left: string;
  top: string;
  delay: number;
}

const VirtualRoomLanding: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const GradientOrb: React.FC<GradientOrbProps> = ({
    size,
    left,
    top,
    delay,
  }) => (
    <div
      className={`absolute rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-xl animate-pulse`}
      style={{
        width: size,
        height: size,
        left: left,
        top: top,
        animationDelay: `${delay}s`,
        animationDuration: "4s",
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background gradient orbs */}
      <GradientOrb size="300px" left="10%" top="20%" delay={0} />
      <GradientOrb size="200px" left="80%" top="60%" delay={1} />
      <GradientOrb size="150px" left="60%" top="10%" delay={2} />

      {/* Mouse follower */}
      <div
        className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 transition-transform duration-75 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(1)",
        }}
      />

      {/* Navigation */}
      <Navbar isVisible={isVisible} setIsVisible={setIsVisible} />

      {/* Hero Section */}
      <HeroSection isVisible={isVisible} />

      {/* Features Preview */}
      <Features isVisible={isVisible} />

      {/* CTA Section */}
      <CTA isVisible={isVisible} />

      {/* Footer */}
      <Footer isVisible={isVisible} />
    </div>
  );
};

export default VirtualRoomLanding;
