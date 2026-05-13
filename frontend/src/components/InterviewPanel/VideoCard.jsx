import React from "react";
import { Mic } from "lucide-react";

const VideoCard = ({ user, isCurrentUser, onPin }) => {
  return (
    <div
      onClick={onPin}
      className="min-w-[160px] h-24 bg-gray-200 rounded-xl overflow-hidden relative cursor-pointer  transition"
    >
      {/* VIDEO PLACEHOLDER */}
      <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">
        Video
      </div>

      {/* NAME */}
      <div className="absolute bottom-1 left-2 text-white text-xs bg-black/50 px-2 py-[2px] rounded">
        {isCurrentUser ? "You" : user.user?.name}
      </div>

      {/* MIC ICON */}
      <div className="absolute bottom-1 right-2 text-white">
        <Mic size={12} />
      </div>
    </div>
  );
};

export default VideoCard;