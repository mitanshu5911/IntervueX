import React, { useEffect, useRef } from "react";

import {
  MicOff,
  VideoOff,
  Pin,
  PinOff,
} from "lucide-react";

const VideoCard = ({
  participant,
  currentUserId,
  localStream,
  remoteStreams,
  pinnedUser,
  setPinnedUser,
}) => {
  const videoRef = useRef(null);

  const isCurrentUser =
    participant?.user?._id?.toString() ===
    currentUserId?.toString();

  const isPinned =
    pinnedUser?.user?._id?.toString() ===
    participant?.user?._id?.toString();

  const remoteStream =
    remoteStreams?.[participant?.socketId];

  useEffect(() => {
    if (!videoRef.current) return;

    if (isCurrentUser) {
      if (localStream) {
        videoRef.current.srcObject = localStream;
      }
    } else {
      if (remoteStream) {
        videoRef.current.srcObject = remoteStream;
      }
    }
  }, [localStream, remoteStream]);

  const handlePinToggle = () => {
    if (isPinned) {
      setPinnedUser(null);
    } else {
      setPinnedUser(participant);
    }
  };

  return (
    <div className="relative min-w-[220px] h-full rounded-2xl overflow-hidden bg-black border border-gray-800">
      {(isCurrentUser && localStream) ||
      (!isCurrentUser && remoteStream) ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isCurrentUser}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-semibold uppercase">
            {participant?.user?.name?.charAt(0)}
          </div>

          <p className="mt-2 text-sm">
            {participant?.user?.name}
          </p>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute top-3 left-3 flex gap-2">
        {!participant?.isMicOn && (
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
            <MicOff size={14} className="text-white" />
          </div>
        )}

        {!participant?.isCameraOn && (
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
            <VideoOff size={14} className="text-white" />
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <span className="text-white text-sm font-medium truncate">
          {isCurrentUser
            ? `${participant?.user?.name} (You)`
            : participant?.user?.name}
        </span>

        <button
          onClick={handlePinToggle}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isPinned
              ? "bg-indigo-600 text-white"
              : "bg-white text-black"
          }`}
        >
          {isPinned ? (
            <PinOff size={16} />
          ) : (
            <Pin size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;

