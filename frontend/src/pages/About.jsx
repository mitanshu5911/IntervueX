import React from "react";
import { motion } from "framer-motion";

import {
  FaVideo,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaBrain,
} from "react-icons/fa";

const features = [
  {
    title: "Real-Time Interviews",
    description:
      "Conduct smooth live interviews with modern meeting experiences and instant collaboration.",
    icon: FaVideo,
  },
  {
    title: "Candidate Management",
    description:
      "Manage interview invitations, schedules, and candidates from one centralized platform.",
    icon: FaUsers,
  },
  {
    title: "Smart Scheduling",
    description:
      "Organize interviews efficiently with advanced scheduling and workflow automation.",
    icon: FaClock,
  },
  {
    title: "Secure Platform",
    description:
      "Built with secure architecture and scalable systems for reliable interview experiences.",
    icon: FaShieldAlt,
  },
];

const stats = [
  {
    number: "100+",
    title: "Meetings Hosted",
  },
  {
    number: "24/7",
    title: "Availability",
  },
  {
    number: "99%",
    title: "Reliable Sessions",
  },
  {
    number: "4",
    title: "Core Developers",
  },
];

const About = () => {
  return (
    <div
      className="
      min-h-screen overflow-hidden
      bg-gradient-to-br
      from-indigo-50
      via-white
      to-purple-100
    "
    >
      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative px-6 md:px-10 pt-24 pb-28">
        {/* BACKGROUND GLOWS */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-indigo-300/30 blur-3xl rounded-full" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300/30 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* BADGE */}
              <div
                className="
                inline-flex items-center gap-2
                px-5 py-2 rounded-full
                bg-indigo-100 border border-indigo-200
                text-indigo-700 text-sm font-medium
              "
              >
                <FaRocket />
                Future of Online Interviews
              </div>

              {/* TITLE */}
              <h1
                className="
                text-5xl md:text-7xl
                font-black tracking-tight
                mt-8 leading-tight
              "
              >
                Building Better{" "}
                <span
                  className="
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  bg-clip-text text-transparent
                "
                >
                  Interview
                </span>{" "}
                Experiences
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                mt-8 text-lg md:text-xl
                text-gray-600 leading-relaxed
                max-w-2xl
              "
              >
                IntervueX transforms online interviews
                through smart scheduling, seamless live
                meetings, candidate management, and modern
                collaboration experiences.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5 mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="
                  px-8 py-4 rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  text-white font-medium
                  shadow-xl
                "
                >
                  Explore Platform
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="
                  px-8 py-4 rounded-2xl
                  bg-white/70 backdrop-blur-md
                  border border-gray-200
                  text-gray-800 font-medium
                  shadow-lg
                "
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="
                relative rounded-[2.5rem]
                bg-white/70 backdrop-blur-xl
                border border-white/50
                shadow-2xl
                p-8 overflow-hidden
              "
              >
                {/* GLOW */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-400/20 blur-3xl rounded-full" />

                {/* CARD */}
                <div className="relative z-10 flex flex-col gap-6">
                  {/* TOP */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        IntervueX Dashboard
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Modern Interview Experience
                      </p>
                    </div>

                    <div
                      className="
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-r
                      from-indigo-500
                      to-purple-500
                      flex items-center justify-center
                      text-white text-2xl
                      shadow-xl
                    "
                    >
                      <FaBrain />
                    </div>
                  </div>

                  {/* BLOCKS */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {stats.map((stat) => (
                      <div
                        key={stat.title}
                        className="
                        p-5 rounded-2xl
                        bg-gradient-to-br
                        from-indigo-50
                        to-purple-50
                        border border-indigo-100
                      "
                      >
                        <h3 className="text-3xl font-bold text-indigo-600">
                          {stat.number}
                        </h3>

                        <p className="text-gray-600 mt-2 text-sm">
                          {stat.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FEATURES */}
      {/* ====================================================== */}

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold">
              Powerful Features
            </h2>

            <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
              Designed with modern UI, smart workflows, and
              seamless communication to simplify technical
              interview experiences.
            </p>
          </motion.div>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                  relative overflow-hidden
                  rounded-[2rem]
                  bg-white/70 backdrop-blur-md
                  border border-white/50
                  shadow-xl
                  p-8
                "
                >
                  {/* GLOW */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 blur-2xl rounded-full" />

                  <div
                    className="
                    relative z-10
                    w-16 h-16 rounded-2xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    flex items-center justify-center
                    text-white text-2xl
                    shadow-lg
                  "
                  >
                    <Icon />
                  </div>

                  <h3 className="text-2xl font-semibold mt-8">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mt-5 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* VISION BLOCK */}
      {/* ====================================================== */}

      <section className="px-6 md:px-10 py-24">
        <div
          className="
          max-w-7xl mx-auto
          rounded-[3rem]
          overflow-hidden
          bg-gradient-to-r
          from-indigo-600
          via-purple-600
          to-indigo-700
          shadow-2xl
          relative
        "
        >
          {/* GLOW */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full" />

          <div
            className="
            relative z-10
            px-8 md:px-16 py-20
            text-center text-white
          "
          >
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black"
            >
              Our Vision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="
              mt-8 max-w-4xl mx-auto
              text-lg md:text-xl
              text-indigo-100 leading-relaxed
            "
            >
              We believe interviews should be smarter,
              faster, and more human-centered. IntervueX
              combines modern technology with intuitive
              design to create seamless hiring experiences
              for recruiters and candidates alike.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;