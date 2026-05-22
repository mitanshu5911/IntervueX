import React, { useEffect, useMemo, useRef } from "react";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Pin,
  PinOff,
} from "lucide-react";

const MainVideo = ({
  participant,
  currentUserId,
  localStream,
  remoteStreams,
  pinnedUser,
  setPinnedUser,
  onToggleMic,
  onToggleCamera,
  isMicOn,
  isCameraOn,
}) => {
  const videoRef = useRef(null);

  const isCurrentUser =
    participant?.user?._id?.toString() ===
    currentUserId?.toString();

  const isPinned =
    pinnedUser?.user?._id?.toString() ===
    participant?.user?._id?.toString();

  const remoteStream = useMemo(() => {
    if (!participant?.socketId) return null;

    return remoteStreams?.[participant.socketId];
  }, [participant, remoteStreams]);

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
  }, [localStream, remoteStream, isCurrentUser]);

  const handlePinToggle = () => {
    if (isPinned) {
      setPinnedUser(null);
    } else {
      setPinnedUser(participant);
    }
  };

  return (
    <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
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
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-semibold uppercase">
              {participant?.user?.name?.charAt(0)}
            </div>

            <p className="text-xl">
              {participant?.user?.name}
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-medium">
        {isCurrentUser
          ? `${participant?.user?.name} (You)`
          : participant?.role === "interviewer"
          ? `${participant?.user?.name} (Interviewer)`
          : participant?.user?.name}
      </div>

      <div className="absolute bottom-4 left-4 flex gap-3">
        {isCurrentUser && (
          <>
            <button
              onClick={onToggleMic}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isMicOn
                  ? "bg-white text-black"
                  : "bg-red-500 text-white"
              }`}
            >
              {isMicOn ? (
                <Mic size={20} />
              ) : (
                <MicOff size={20} />
              )}
            </button>

            <button
              onClick={onToggleCamera}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCameraOn
                  ? "bg-white text-black"
                  : "bg-red-500 text-white"
              }`}
            >
              {isCameraOn ? (
                <Video size={20} />
              ) : (
                <VideoOff size={20} />
              )}
            </button>
          </>
        )}

        {!isCurrentUser && (
          <button
            onClick={handlePinToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isPinned
                ? "bg-indigo-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {isPinned ? (
              <PinOff size={20} />
            ) : (
              <Pin size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainVideo;

