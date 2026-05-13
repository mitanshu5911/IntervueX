import { X, Check, User } from "lucide-react";
import React from "react";

const WaitingList = ({ waitingParticipants = [], onAccept, onReject , onClose}) => {
  return (
    <div className="w-full min-h-80 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden flex flex-col">

      {/* Header */}
      <div className="h-14 sticky top-0 bg-white border-b border-gray-300 px-4 flex items-center justify-between z-10">
        <span className="text-lg font-semibold text-gray-800">
          Waiting List
        </span>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition" onClick={onClose}>
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {waitingParticipants.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No participants waiting
          </div>
        ) : (
          waitingParticipants.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User size={18} className="text-indigo-600" />
                </div>

                <div className="max-w-50 overflow-hidden">
                  <p className="text-sm font-medium text-gray-800">
                    {p.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {p.user?.email}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                
                <button
                  onClick={() => onAccept?.(p)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition"
                >
                  <Check size={14} />
                </button>

                <button
                  onClick={() => onReject?.(p)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WaitingList;