import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Plus,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Create Room",
    route: "/create-room",
    icon: Plus,
  },
  {
    title: "My Meetings",
    route: "/my-meetings",
    icon: Calendar,
  },
  {
    title: "Scheduled For Me",
    route: "/scheduled-for-me",
    icon: Video,
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.route)}
            className="bg-white/80 backdrop-blur-md
            border border-gray-200 shadow-sm
            rounded-3xl p-5 flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-2xl
              bg-indigo-100 flex items-center justify-center"
            >
              <Icon className="text-indigo-600" />
            </div>

            <div className="text-left">
              <h2 className="font-semibold text-gray-800">
                {action.title}
              </h2>

              <p className="text-sm text-gray-500">
                Open section
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuickActions;