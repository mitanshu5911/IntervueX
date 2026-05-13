import { motion } from "framer-motion";
import { Calendar, Clock, User, MoreVertical, Video } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";

const statusStyles = {
  active: "bg-blue-100 text-blue-600",
  scheduled: "bg-orange-100 text-orange-600",
  ended: "bg-gray-200 text-gray-600",
};

const RoomCard = ({ room, color }) => {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="w-full bg-white/90 backdrop-blur-md 
      border border-gray-200 rounded-2xl shadow-sm 
      hover:shadow-xl transition-all 
      flex flex-col md:flex-row gap-4 
      p-4 md:p-5 relative overflow-hidden"
    >
      {/* COLOR STRIPS */}
      <div className={`absolute left-0 top-0 h-full w-[5px] ${color}`} />
      <div className={`absolute right-0 top-0 h-full w-[5px] ${color} opacity-80`} />

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex flex-col gap-3">

        {/* TOP */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              {room.title}
            </h3>
            <p className="text-xs text-gray-500">
              Room ID: {room.roomId}
            </p>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </div>

        {/* DATE + INTERVIEWER (same row) */}
        <div className="flex justify-between items-center text-sm text-gray-600 ">
          
          {/* LEFT: DATE + TIME */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(room.scheduledAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} />
              {new Date(room.scheduledAt).toLocaleTimeString()}
            </div>
          </div>

          {/* RIGHT: INTERVIEWER */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <User size={14} />
                {room.interviewer?.name || "You"}
            </div>
            <span className="text-xs text-gray-400">
              Interviewer
            </span>
          </div>

        </div>

        {/* STATUS + ACTION */}
        <div className="flex items-center justify-between mt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium 
            ${statusStyles[room.status]}`}
          >
            {room.status}
          </span>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-indigo-500 
            text-white text-sm shadow-md hover:shadow-lg transition"
             onClick={() => navigate(`/room/${room.roomId}`)}
          >
            Join
            <Video size={14} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:flex items-center justify-between w-full">

        <div className="flex flex-col gap-1 w-[30%] pl-3">
          <h3 className="font-semibold text-gray-800">
            {room.title}
          </h3>
          <p className="text-xs text-gray-500">
            Room ID: {room.roomId}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-600 w-[20%]">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {new Date(room.scheduledAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} />
            {new Date(room.scheduledAt).toLocaleTimeString()}
          </div>
        </div>

       <div className="flex flex-col items-center justify-center text-sm text-gray-600 w-[20%] ">
  
  <div className="flex items-center gap-2 ">
    <User size={14} />
    {room.interviewer?.name || "You"}
  </div>

  <span className="text-xs text-gray-400 text-center">
    Interviewer
  </span>

</div>

        <div className="flex items-center  gap-2 min-w-[25%] justify-between ">
          <div className="w-20 ">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex justify-center
              
              ${statusStyles[room.status]}`}
              >
            {room.status}
          </span>

            </div>

            <div className="flex gap-5">

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-indigo-500 
            text-white text-sm shadow-md hover:shadow-lg transition"
            onClick={()=>navigate(`/room/${room.roomId}`)}
            >
            Join
            <Video size={14} />
          </button>

          <button className="p-[10px] rounded-lg hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;