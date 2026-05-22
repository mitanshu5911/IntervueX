import React from "react";
import { Calendar, Clock } from "lucide-react";

const RecentMeetingCard = ({ room }) => {
  return (
    <div
      className="border border-gray-200 rounded-2xl
      p-4 flex items-center justify-between"
    >
      <div>
        <h3 className="font-semibold text-gray-800">
          {room.title}
        </h3>

        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(room.scheduledAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-1">
            <Clock size={14} />
            {new Date(room.scheduledAt).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium
        ${
          room.status === "active"
            ? "bg-green-100 text-green-600"
            : room.status === "scheduled"
            ? "bg-orange-100 text-orange-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {room.status}
      </span>
    </div>
  );
};

export default RecentMeetingCard;