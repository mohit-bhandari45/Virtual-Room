import React from "react";
import { FadeLoader } from "react-spinners";

const Processing = ({ msg }: { msg: string }) => {
  return (
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Custom bounce loader with white color */}
        <FadeLoader color="black" size={40} speedMultiplier={0.8} />

        {/* Message with gradient text */}
        <div className="text-lg font-medium text-black bg-clip-text">
          {msg}
        </div>
      </div>
  );
};

export default Processing;
