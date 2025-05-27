import React from "react";
import FloatingCard from "./FloatingCard";
import { Globe, Shield, Users } from "lucide-react";

const Features = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <FloatingCard isVisible={isVisible} delay={200}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:scale-105">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Seamless Collaboration
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Real-time collaboration tools that make remote work feel natural
              and engaging.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:scale-105">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Global Accessibility</h3>
            <p className="text-gray-400 leading-relaxed">
              Connect from anywhere with lightning-fast performance and
              crystal-clear quality.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:scale-105">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Enterprise Security</h3>
            <p className="text-gray-400 leading-relaxed">
              Bank-grade encryption and privacy controls to keep your
              conversations secure.
            </p>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
};

export default Features;
