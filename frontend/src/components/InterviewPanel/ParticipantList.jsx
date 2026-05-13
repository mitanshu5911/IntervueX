import {
  X,
  User,
  MoreVertical,
  MicOff,
  VideoOff,
  Pin,
  UserX,
} from "lucide-react";
import React, { useState } from "react";

const ParticipantList = ({
  joinedParticipants = [],
  currentUserId,
  onClose,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const sortedParticipants = [...joinedParticipants].sort((a, b) => {
    if (a.user?._id === currentUserId) return -1;
    if (b.user?._id === currentUserId) return 1;
    return 0;
  });

  return (
    <div className="w-full min-h-80  bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="h-14 sticky top-0 bg-white border-b border-gray-300 px-4 flex items-center justify-between z-10">
        <span className="text-lg font-semibold text-gray-800">
          Participants
        </span>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={onClose}
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">
        {sortedParticipants.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No participants joined
          </div>
        ) : (
          sortedParticipants.map((p) => (
            <div
              key={p._id}
              className="relative flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User size={18} className="text-indigo-600" />
                </div>

                <div className="max-w-[160px] overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate flex items-center gap-1">
                    {p.user?._id === currentUserId ? (
                      <>
                       { p.user?.name}
                        <span className="text-xs text-indigo-500">(You)</span>
                      </>
                    ) : (
                      p.user?.name || "User"
                    )}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {p.user?.email}
                  </p>
                </div>
              </div>

              {/* RIGHT MENU BUTTON */}
              <button
                onClick={() => toggleMenu(p._id)}
                className="p-2 rounded-lg hover:bg-gray-200 transition"
              >
                <MoreVertical size={16} className="text-gray-600" />
              </button>

              {/* DROPDOWN */}
              {activeMenu === p._id && (
                <div className="absolute right-4 top-12 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-fadeIn">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 transition">
                    <MicOff size={14} /> Mute
                  </button>

                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 transition">
                    <VideoOff size={14} /> Stop Video
                  </button>

                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 transition">
                    <Pin size={14} /> Pin
                  </button>

                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                    <UserX size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParticipantList;
