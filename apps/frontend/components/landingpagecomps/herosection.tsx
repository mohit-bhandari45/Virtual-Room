import React from "react";
import FloatingCard from "./FloatingCard";
import { ArrowRight, Play, Sparkles, Video } from "lucide-react";

const HeroSection = ({ isVisible }: {isVisible: boolean;}) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
      <div className="text-center">
        <FloatingCard isVisible={isVisible} delay={200}>
          <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Now with AI-powered room intelligence
            </span>
          </div>
        </FloatingCard>

        <FloatingCard isVisible={isVisible} delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent leading-tight">
            Virtual Rooms
            <br />
            <span className="bg-gradient-to-r from-gray-400 to-white bg-clip-text">
              Reimagined
            </span>
          </h1>
        </FloatingCard>

        <FloatingCard isVisible={isVisible} delay={200}>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of collaboration with immersive virtual spaces
            that adapt to your workflow. Connect, create, and innovate like
            never before.
          </p>
        </FloatingCard>

        <FloatingCard isVisible={isVisible} delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button className="bg-white hover:scale-105 duration-500 text-black px-8 py-4 rounded-full font-semibold flex items-center hover:bg-gray-100 transition-all transform shadow-2xl cursor-pointer">
              <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Free Room
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border hover:scale-105 duration-500 cursor-pointer border-white/30 text-white px-8 py-4 rounded-full font-semibold flex items-center hover:bg-white/10 transition-all backdrop-blur-sm">
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </FloatingCard>

        {/* Stats */}
        <FloatingCard isVisible={isVisible} delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default HeroSection;
