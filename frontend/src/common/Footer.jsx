// src/components/common/footer/Footer.jsx

import React from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaVideo,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const members = [
  {
    name: "Mitanshu Bansal",
    id: "2310991398",
  },
  {
    name: "Ruman Singla",
    id: "2310991196",
  },
  {
    name: "Jitesh Jain",
    id: "2310990535",
  },
  {
    name: "Archit Gupta",
    id: "2310990294",
  },
];

const Footer = () => {
  return (
    <footer
      className="
      relative overflow-hidden mt-10
      bg-[radial-gradient(circle_at_top_left,_#312e81,_#020617,_#000)]
      text-white border-t border-white/10
    "
    >
      {/* ANIMATED TOP BORDER */}
      <div
        className="
        absolute top-0 left-0
        h-[2px] w-full
        bg-gradient-to-r
        from-transparent
        via-indigo-500
        to-transparent
        animate-pulse
      "
      />

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ========================================= */}
          {/* BRAND */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div
                className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-r from-indigo-500 to-purple-500
                flex items-center justify-center
                shadow-[0_0_30px_rgba(99,102,241,0.4)]
              "
              >
                <FaVideo className="text-2xl text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-wide">
                  IntervueX
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Smart Interview Platform
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              IntervueX is a modern interview and meeting
              management platform built to simplify online
              interviews, candidate interaction, scheduling,
              and real-time collaboration.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3">
              {/* FEATURE */}
              <div
                className="
                flex items-center gap-2
                px-4 py-2 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-md
              "
              >
                <FaVideo className="text-indigo-400 text-sm" />

                <span className="text-sm text-gray-300">
                  Live Meetings
                </span>
              </div>

              {/* FEATURE */}
              <div
                className="
                flex items-center gap-2
                px-4 py-2 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-md
              "
              >
                <FaUsers className="text-purple-400 text-sm" />

                <span className="text-sm text-gray-300">
                  Candidate Management
                </span>
              </div>

              {/* FEATURE */}
              <div
                className="
                flex items-center gap-2
                px-4 py-2 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-md
              "
              >
                <FaShieldAlt className="text-emerald-400 text-sm" />

                <span className="text-sm text-gray-300">
                  Secure Platform
                </span>
              </div>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* TEAM MEMBERS */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Team Members
            </h2>

            <div className="flex flex-col gap-4">
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                  flex items-center justify-between
                  p-4 rounded-2xl
                  bg-white/5 border border-white/10
                  backdrop-blur-md
                  hover:bg-white/10
                  hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]
                  transition-all duration-300
                "
                >
                  <div>
                    <h3 className="font-medium text-white text-base">
                      {member.name}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {member.id}
                    </p>
                  </div>

                  {/* AVATAR */}
                  <div
                    className="
                    w-11 h-11 rounded-full
                    bg-gradient-to-r from-indigo-500 to-purple-500
                    flex items-center justify-center
                    text-white font-semibold
                    shadow-lg
                  "
                  >
                    {member.name.charAt(0)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* CONTACT / SOCIAL */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold">
              Connect With Us
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Built with passion for smarter interviews,
              seamless collaboration, and modern hiring
              experiences.
            </p>

            {/* EMAIL */}
            <div
              className="
              flex items-center gap-3
              p-4 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
            "
            >
              <MdEmail className="text-indigo-400 text-2xl" />

              <span className="text-sm text-gray-300">
                support@intervuex.com
              </span>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-4">
              {/* GITHUB */}
              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href="#"
                className="
                w-12 h-12 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-md
                flex items-center justify-center
                hover:bg-indigo-500
                transition-all duration-300
              "
              >
                <FaGithub className="text-lg" />
              </motion.a>

              {/* LINKEDIN */}
              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href="#"
                className="
                w-12 h-12 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-md
                flex items-center justify-center
                hover:bg-blue-500
                transition-all duration-300
              "
              >
                <FaLinkedinIn className="text-lg" />
              </motion.a>
            </div>

            {/* QUOTE */}
            <div
              className="
              mt-2 p-5 rounded-2xl
              bg-gradient-to-r from-indigo-500/10 to-purple-500/10
              border border-white/10
              backdrop-blur-md
            "
            >
              <p className="text-sm text-gray-300 italic leading-relaxed">
                “Empowering interviews with simplicity,
                speed, and seamless collaboration.”
              </p>
            </div>
          </motion.div>
        </div>

        {/* ========================================= */}
        {/* BOTTOM */}
        {/* ========================================= */}

        <div
          className="
          mt-14 pt-6
          border-t border-white/10
          flex flex-col md:flex-row
          items-center justify-between gap-4
        "
        >
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} IntervueX. All
            rights reserved.
          </p>

          <p className="text-sm text-gray-500 text-center">
            Built by Team IntervueX 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;