import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, MessageSquare, MoreHorizontal } from "lucide-react";

const Header = ({ room, participant, waitingCount, onOpenWaitingList , onOpenParticipantList, participantCount}) => {
  return (
    <div className="h-10 w-full  px-4 flex justify-between items-center ">
      <div className="h-full flex items-center">
        <div className="w-0.5 bg-indigo-600 h-full" />

        <h1 className="font-semibold text-xl text-gray-900 pl-3">
          {room.title}
        </h1>

        <div className="h-full flex items-center px-5">
          <motion.div
            className="h-6 min-w-17.5 rounded-full flex items-center justify-center gap-2 text-xs font-semibold"
            animate={{
              scale: [1, 1.02, 1],
              backgroundColor: ["#86efac", "#4ade80", "#86efac"],
              color: ["#166534", "#14532d", "#166534"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <span>Active</span>
          </motion.div>
        </div>
      </div>

      <div className="h-full flex justify-center items-center  gap-8">
        <button className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition" 
        onClick={onOpenParticipantList}>
          <Users size={16} className="text-gray-600" />
            <span className="text-sm text-gray-700">Participants</span>

          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
            {participantCount}
          </span>
        </button>

        <button className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        onClick={onOpenWaitingList}>
        <Clock size={16} />
        <span className="text-sm">Waiting</span>

        <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-[10px] px-1.5 py-[1px] rounded-full font-semibold border border-gray-200">
          {waitingCount}
        </span>
      </button>

        <button className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition">
        <MessageSquare size={16} className="text-gray-600" />
        <span className="text-sm text-gray-700">Chat</span>

      
        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
          3
        </span>
      </button>



        <button className="p-2 rounded-lg  bg-white hover:bg-gray-100 transition">
        <MoreHorizontal size={18} className="text-gray-600" />
      </button>
      </div>
    </div>
  );
};

export default Header;
