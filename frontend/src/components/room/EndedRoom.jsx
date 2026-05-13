import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import image from "../../assets/meetingEnded.png";

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
};

const formatTime = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleTimeString();
};

const EndedRoom = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[89vh] overflow-hidden 
    bg-gradient-to-br from-indigo-50 via-white to-indigo-100 
    flex flex-col md:flex-row">

      {/* LEFT SIDE (IMAGE) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 h-[40%] md:h-full 
        flex items-center justify-center p-4 md:p-8"
      >
        <img
          src={image}
          alt="Meeting Ended"
          className="max-h-full max-w-full object-contain"
        />
      </motion.div>

      {/* RIGHT SIDE (CONTENT) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 h-[60%] md:h-full 
        flex flex-col justify-center 
        px-5 md:px-10 py-4 md:py-6 overflow-hidden"
      >

        {/* TITLE */}
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Interview Completed
        </h1>

        <p className="text-sm text-gray-500 mt-2 max-w-md">
          This session has ended successfully. Review the details below.
        </p>

        {/* ROOM TITLE */}
        <h2 className="mt-3 text-base md:text-xl font-semibold text-indigo-600">
          {room?.title || "Interview Session"}
        </h2>

        {/* DETAILS */}
        <div className="mt-4 space-y-3">

          <div className="flex items-center gap-3">
            <User size={16} className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Interviewer</p>
              <p className="text-sm font-medium text-gray-800">
                {room?.interviewer?.name || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Started</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(room?.startedAt)} • {formatTime(room?.startedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Ended</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(room?.endedAt)} • {formatTime(room?.endedAt)}
              </p>
            </div>
          </div>

        </div>

        {/* STATUS */}
        <div className="mt-4">
          <span className="px-3 py-1 rounded-full 
          bg-green-100 text-green-600 text-xs font-medium">
            Session Completed
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-5 w-fit flex items-center gap-2 px-5 py-2.5 
          rounded-xl text-white text-sm font-medium
          bg-gradient-to-r from-indigo-600 to-indigo-500
          shadow-md hover:shadow-lg transition"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        {/* FOOTER */}
        <p className="mt-3 text-xs text-gray-400">
          You can now safely close this session.
        </p>

      </motion.div>
    </div>
  );
};

export default EndedRoom;