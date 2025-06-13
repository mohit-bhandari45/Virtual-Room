import React from "react";
import { FadeLoader } from "react-spinners";

const Processing = ({ msg }: { msg: string }) => {
  return (
    <div className="relative z-10 flex flex-col items-center space-y-6">
      {/* FadeLoader with custom color, dimensions, etc. */}
      <FadeLoader color="#000000" height={15} width={5} margin={2} speedMultiplier={0.8} />

      {/* Message with gradient text */}
      <div className="text-lg font-semibold text-black">
        {msg}
      </div>
    </div>
  );
};

export default Processing;
