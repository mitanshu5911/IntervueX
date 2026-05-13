import React, { useEffect, useRef, useState } from "react";
import { connectSocket } from "../../socket/socket";
import { useToast } from "../../contexts/ToastContext";
import { motion } from "framer-motion";
import { Mail, Mic, MicOff, User, Video, VideoOff, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WaitingRoom = ({ room, participant }) => {
  const socket = connectSocket();
  const toast = useToast();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [interviewerJoined, setInterviewerJoined] = useState(false);

 
  useEffect(() => {
  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      toast.error("Camera/Mic permission denied");
    }
  };

  init();

  return () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
}, []);
 


  

  useEffect(() => {
    socket.on("interviewer-status", ({ isJoined }) => {
      setInterviewerJoined(isJoined);
    });

    socket.on("interviewer-joined", () => setInterviewerJoined(true));
    socket.on("interviewer-left", () => setInterviewerJoined(false));

    return () => {
      socket.off("interviewer-status");
      socket.off("interviewer-joined");
      socket.off("interviewer-left");
    };
  }, []);

  const toggleMic = () => {
    const track = streamRef.current?.getAudioTracks()[0];
    if (!track) return;

    track.enabled = !track.enabled;
    setIsMicOn(track.enabled);

    socket.emit("toggle-media", {
      roomId: room.roomId,
      userId: participant.user,
      type: "mic",
      value: track.enabled,
    });
  };

  const toggleCamera = async () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];

    if (videoTrack && isCameraOn) {
      videoTrack.stop();
      setIsCameraOn(false);

      socket.emit("toggle-media", {
        roomId: room.roomId,
        userId: participant.user,
        type: "camera",
        value: false,
      });
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const newTrack = newStream.getVideoTracks()[0];

        const updatedStream = new MediaStream([
          ...streamRef.current.getAudioTracks(),
          newTrack,
        ]);

        streamRef.current = updatedStream;
        videoRef.current.srcObject = updatedStream;

        setIsCameraOn(true);

        socket.emit("toggle-media", {
          roomId: room.roomId,
          userId: participant.user,
          type: "camera",
          value: true,
        });
      } catch {
        toast.error("Camera restart failed");
      }
    }
  };

const leaveRoom = () => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }

  navigate("/scheduled-for-me");
};

  return (
    <div className="w-full h-[89vh] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full gap-6 grid grid-cols-3"
      >
        <div className="col-span-2 relative rounded-2xl overflow-hidden border border-gray-300 shadow-3xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[75vh] object-cover bg-black scale-x-[-1]"
          />

          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur">
            {participant?.user?.name + " (You)"}
          </div>

          <div className="absolute bottom-5 left-5 flex gap-4">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full shadow-lg transition ${
                isMicOn
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full shadow-lg transition ${
                isCameraOn
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
          </div>

          <button
            onClick={leaveRoom}
            className="absolute bottom-5 right-5 flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition"
          >
            <LogOut size={16} />
            Leave Room
          </button>
        </div>

        {/* RIGHT SIDE UNTOUCHED */}
        <div className="relative bg-white/90 backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-3xl p-7 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-white opacity-60 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              {room?.title || "Interview Session"}
            </h2>

            <motion.p className="mt-4 text-sm text-gray-600">
              {interviewerJoined
                ? "The interviewer has joined. You're almost in — just waiting for approval."
                : "The interviewer hasn’t joined yet. Sit tight, we’ll notify you the moment they arrive."}
            </motion.p>

            <div className="mt-6 flex items-center gap-3">
             <motion.div
  animate={{
    scale: [1, 1.4, 1],
    opacity: [1, 0.5, 1],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className={`w-3 h-3 rounded-full ${
    interviewerJoined ? "bg-green-400" : "bg-amber-400"
  }`}
/>
              <span className="text-sm text-gray-500">
                {interviewerJoined
                  ? "Interviewer is online"
                  : "Waiting for interviewer"}
              </span>
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500">Interviewer</p>
                  <p className="text-sm font-medium text-gray-800">
                    {room?.interviewer?.name || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-300 pt-3">
                <Mail className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {room?.interviewer?.email || "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            Make sure your camera and microphone are ready.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitingRoom;