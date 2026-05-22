import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600
      rounded-3xl p-6 md:p-8 text-white shadow-xl"
    >
      <h1 className="text-3xl md:text-4xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      <p className="mt-3 text-indigo-100 max-w-2xl">
        Manage interviews, schedule meetings, and join
        sessions seamlessly with IntervueX.
      </p>
    </motion.div>
  );
};

export default HeroSection;