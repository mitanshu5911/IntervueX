import React from "react";
import { motion } from "framer-motion";
import { Video, Calendar, Users, Clock3 } from "lucide-react";

const cards = [
  {
    title: "Active Rooms",
    key: "active",
    icon: Video,
  },
  {
    title: "Scheduled",
    key: "scheduled",
    icon: Calendar,
  },
  {
    title: "For You",
    key: "forMe",
    icon: Users,
  },
  {
    title: "Total Meetings",
    key: "total",
    icon: Clock3,
  },
];

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md
            rounded-3xl border border-gray-200
            shadow-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {stats[card.key]}
                </h2>
              </div>

              <div
                className="w-12 h-12 rounded-2xl
                bg-indigo-100 flex items-center justify-center"
              >
                <Icon className="text-indigo-600" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;