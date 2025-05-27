import React from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  isVisible: boolean;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  isVisible,
  delay = 0,
  className = "",
}) => (
  <div
    className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default FloatingCard;
