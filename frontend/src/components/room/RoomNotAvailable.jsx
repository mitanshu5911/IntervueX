import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/roomNotAvailavle.png";

const RoomNotAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[89vh] 
    bg-gradient-to-br from-indigo-50 via-white to-indigo-100 
    flex flex-col items-center justify-center text-center px-5">

      {/* IMAGE */}
      <motion.img
        src={img}
        alt="Room Not Available"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-[260px] md:w-[360px] lg:w-[420px] object-contain select-none pointer-events-none"
      />

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-2xl md:text-3xl font-bold text-gray-800"
      >
        Meeting Not Available
      </motion.h1>

      {/* SUBTEXT */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-2 text-sm md:text-base text-gray-500 max-w-md"
      >
        The meeting you're trying to join is unavailable or has ended.
        Please check the link or contact the host.
      </motion.p>

      {/* BUTTON */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 flex items-center gap-2 
        px-6 py-3 rounded-2xl 
        bg-gradient-to-r from-indigo-600 to-indigo-500 
        text-white font-medium shadow-lg shadow-indigo-500/30
        hover:shadow-indigo-500/50 transition-all"
      >
        <ArrowLeft size={18} />
        Go Back Home
      </motion.button>

    </div>
  );
};

export default RoomNotAvailable;