import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, Pin } from "lucide-react";

const MainVideo = ({ mainUser, currentUserId, pinnedUser, onPinToggle }) => {
  const videoRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const isCurrentUser = mainUser?.user?._id === currentUserId;

  // 🎥 Get media ONLY if this is current user
  useEffect(() => {
    if (!isCurrentUser) return;

    let localStream;

    const startMedia = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(localStream);

        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
      } catch (err) {
        console.error("Media error:", err);
      }
    };

    startMedia();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, [isCurrentUser]);

  // 🎤 MIC TOGGLE
  const toggleMic = () => {
    if (!stream) return;

    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMicOn((prev) => !prev);
  };

  // 🎥 CAMERA TOGGLE
  const toggleCamera = () => {
    if (!stream) return;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsCameraOn((prev) => !prev);
  };

  // 📌 PIN TOGGLE
  const handlePin = () => {
    if (!onPinToggle) return;

    if (pinnedUser?._id === mainUser?._id) {
      onPinToggle(null);
    } else {
      onPinToggle(mainUser);
    }
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black">

      {/* VIDEO AREA */}
      {isCurrentUser ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-lg">
          {mainUser?.user?.name}'s Video
        </div>
      )}

      {/* USER NAME (TOP RIGHT) */}
      <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
        {isCurrentUser ? "You" : mainUser?.user?.name}
      </div>

      {/* CONTROLS (ONLY FOR CURRENT USER) */}
      {isCurrentUser && (
        <div className="absolute bottom-4 left-4 flex gap-3">

          {/* MIC */}
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition ${
              isMicOn
                ? "bg-white text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          {/* CAMERA */}
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full transition ${
              isCameraOn
                ? "bg-white text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>

          {/* PIN */}
          <button
            onClick={handlePin}
            className={`p-3 rounded-full transition ${
              pinnedUser?._id === mainUser?._id
                ? "bg-indigo-600 text-white"
                : "bg-white text-black"
            }`}
          >
            <Pin size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MainVideo;