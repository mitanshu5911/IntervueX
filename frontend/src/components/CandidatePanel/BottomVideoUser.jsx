import React, { useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Pin,
  PinOff,
} from "lucide-react";

const BottomVideoCard = ({
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
  }, [localStream, remoteStream, isCurrentUser]);

  const handlePinToggle = () => {
    if (isPinned) {
      setPinnedUser(null);
    } else {
      setPinnedUser(participant);
    }
  };

  return (
    <div className="relative min-w-[220px] h-full rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-lg group">

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
        <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-900 to-black">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-semibold uppercase">
            {participant?.user?.name?.charAt(0)}
          </div>

          <p className="mt-3 text-sm font-medium">
            {participant?.user?.name}
          </p>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute top-3 left-3 flex items-center gap-2">
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

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold truncate max-w-[120px]">
            {isCurrentUser
              ? `${participant?.user?.name} (You)`
              : participant?.role === "interviewer"
              ? `${participant?.user?.name} (Interviewer)`
              : participant?.user?.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isCurrentUser && (
            <>
              <button
                onClick={onToggleMic}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isMicOn
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {isMicOn ? (
                  <Mic size={16} />
                ) : (
                  <MicOff size={16} />
                )}
              </button>

              <button
                onClick={onToggleCamera}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isCameraOn
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {isCameraOn ? (
                  <Video size={16} />
                ) : (
                  <VideoOff size={16} />
                )}
              </button>
            </>
          )}

          <button
            onClick={handlePinToggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
              isPinned
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-black hover:bg-gray-200"
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
    </div>
  );
};

export default BottomVideoCard;