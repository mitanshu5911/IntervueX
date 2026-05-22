import React from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div
      className="
      min-h-screen w-full 
      bg-gradient-to-br
      from-indigo-50
      via-white
      to-purple-100
      px-6 md:px-10 py-20
    "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-300/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/30 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ====================================================== */}
        {/* HEADING */}
        {/* ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1
            className="
            text-5xl md:text-7xl
            font-black tracking-tight
          "
          >
            Contact{" "}
            <span
              className="
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              bg-clip-text text-transparent
            "
            >
              IntervueX
            </span>
          </h1>

          <p
            className="
            mt-8 max-w-3xl mx-auto
            text-lg md:text-xl
            text-gray-600 leading-relaxed
          "
          >
            Have questions, suggestions, or feedback?
            Reach out to our team and let’s build better
            interview experiences together.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          {/* ====================================================== */}
          {/* CONTACT FORM */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="
            rounded-[2.5rem]
            bg-white/70 backdrop-blur-xl
            border border-white/50
            shadow-2xl
            p-8 md:p-10
          "
          >
            <h2 className="text-3xl font-bold">
              Send Us a Message
            </h2>

            <p className="text-gray-600 mt-3">
              We usually respond within 24 hours.
            </p>

            {/* FORM */}
            <form className="flex flex-col gap-6 mt-10">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                  mt-3 w-full px-5 py-4
                  rounded-2xl
                  border border-gray-200
                  bg-white/80
                  outline-none
                  focus:ring-2 focus:ring-indigo-500
                "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                  mt-3 w-full px-5 py-4
                  rounded-2xl
                  border border-gray-200
                  bg-white/80
                  outline-none
                  focus:ring-2 focus:ring-indigo-500
                "
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="
                  mt-3 w-full px-5 py-4
                  rounded-2xl
                  border border-gray-200
                  bg-white/80
                  outline-none
                  resize-none
                  focus:ring-2 focus:ring-indigo-500
                "
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                py-4 rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white font-medium
                shadow-xl
              "
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* ====================================================== */}
          {/* CONTACT INFO */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* CARD */}
            {[
              {
                icon: MdEmail,
                title: "Email Address",
                value: "support@intervuex.com",
              },
              {
                icon: FaPhoneAlt,
                title: "Phone Number",
                value: "+91 98765 43210",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Location",
                value: "Chitkara University, Punjab",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                  rounded-[2rem]
                  bg-white/70 backdrop-blur-xl
                  border border-white/50
                  shadow-xl
                  p-8 flex items-center gap-6
                "
                >
                  <div
                    className="
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

                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* SOCIALS */}
            <div
              className="
              rounded-[2rem]
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              p-10 text-white shadow-2xl
            "
            >
              <h2 className="text-3xl font-bold">
                Follow Us
              </h2>

              <p className="mt-4 text-indigo-100">
                Stay connected with our journey and latest
                updates.
              </p>

              <div className="flex gap-5 mt-8">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 4,
                  }}
                  className="
                  w-14 h-14 rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                  flex items-center justify-center
                  text-2xl
                "
                >
                  <FaGithub />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: -4,
                  }}
                  className="
                  w-14 h-14 rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                  flex items-center justify-center
                  text-2xl
                "
                >
                  <FaLinkedinIn />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;