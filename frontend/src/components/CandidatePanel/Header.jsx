import { MessageSquare, MoreHorizontal, Users2 } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ room, allParticipantsCount, onOpenParticipantList }) => {
  return (
    <div className="w-full h-13 py-1 flex items-center justify-between px-4">
      <div className="h-full flex items-center gap-5">

      <div className="flex items-center h-full gap-3">
        <div className="w-1 h-full bg-indigo-600" />
        <h1 className="text-lg font-semibold">
          {room?.title || "Interview Meeting"}
        </h1>
      </div>


        <div className="h-full flex items-center  px-5">
          <motion.div
            
            className="h-5 min-w-16 rounded-full flex items-center justify-center text-xs font-semibold"
          
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


      <div className="h-full flex gap-8 items-center justify-center">
        <button className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border-[1.5px] border-gray-200 bg-white hover:bg-gray-50 transition" onClick={onOpenParticipantList}>
          <Users2 size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700">Participants</span>

          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] px-1.5 py-[1px] rounded-full ">
            {allParticipantsCount}
          </span>
        </button>

        <button className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border  bg-indigo-600 text-white hover:bg-indigo-700 transition">
          <MessageSquare size={16}/>
          <span className="text-sm ">Chat</span>

          <span className="absolute -top-1 -right-1 bg-white text-[10px] px-1.5 py-[1px] rounded-full border border-gray-300 text-indigo-600 font-semibold">
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
