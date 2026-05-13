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
    participant?.user?._id?.toString() === currentUserId?.toString();

  const isPinned =
    pinnedUser?.user?._id?.toString() ===
    participant?.user?._id?.toString();

  const displayName = useMemo(() => {
    if (!participant) return "User";

    if (isCurrentUser) {
      return `${participant.user?.name} (You)`;
    }

    if (participant.role === "interviewer") {
      return `${participant.user?.name} (Interviewer)`;
    }

    return participant.user?.name;
  }, [participant, isCurrentUser]);

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
    if (!participant) return;

    if (isPinned) {
      setPinnedUser(null);
    } else {
      setPinnedUser(participant);
    }
  };

  return (
    <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
      {(isCurrentUser && localStream) || (!isCurrentUser && remoteStream) ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isCurrentUser}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-semibold uppercase">
              {participant?.user?.name?.charAt(0) || "U"}
            </div>

            <p className="text-xl font-medium">
              {participant?.user?.name || "User"}
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-medium">
          {displayName}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        {isCurrentUser && (
          <>
            <button
              onClick={onToggleMic}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isMicOn
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              onClick={onToggleCamera}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isCameraOn
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-red-500 text-white hover:bg-red-600"
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
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isPinned
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainVideo;