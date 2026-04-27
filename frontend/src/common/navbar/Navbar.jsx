import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Italic, MenuIcon, User2, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Components", path: "/components" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated} = useAuth();

  return (
    <header className="w-full h-16 sticky top-0 z-999 flex items-center justify-between px-6 md:px-10 bg-white border-b border-gray-300">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold tracking-wide"
        >
          <span className="text-indigo-600">Intervue</span>
          <span className="text-purple-600 ml-0.5">X</span>
        </motion.h1>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="relative group px-4 py-2 text-sm font-semibold"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`
              relative z-10 transition-all duration-300
              ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500 group-hover:text-indigo-600"
              }
            `}
                >
                  {item.name}
                </span>

                <span
                  className={`
              absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px]
              bg-indigo-600 rounded-full
              transition-all duration-300
              ${isActive ? "w-3/4" : "w-0 group-hover:w-3/4"}
            `}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:block">
        {isAuthenticated ? (
          <button
            onClick={() => setIsAuthenticated(false)} // logout example
            className="w-10 h-10 flex items-center justify-center border-[1px] border-indigo-500 rounded-full cursor-pointer"
          >
            <User2 className="text-indigo-500 w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")} // login example
            className="relative px-5 py-2 rounded-xl font-semibold text-white bg-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Login</span>
          </button>
        )}
      </div>

      <div className="flex md:hidden items-center">
        {isAuthenticated ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl py-2 px-3 rounded-lg transition-all duration-300  
                ${
                  isOpen
                    ? "text-white"
                    : "text-white bg-indigo-500 backdrop-blur-md border border-white/10 "
                }
                `}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")} // login example
            className="relative px-5 py-2 rounded-xl font-semibold text-white bg-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Login</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-[320px]
        bg-white border-l border-indigo-100 z-50 shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-indigo-100">
                <h1 className="text-xl font-bold text-indigo-600">
                  Intervue<span className="text-indigo-400">X</span>
                </h1>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* NAV ITEMS */}
              <div className="flex flex-col mt-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="px-3"
                  >
                    <NavLink
                      key={index}
                      to={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setTimeout(() => {
                          setIsOpen(false);
                        }, 300);
                      }}
                      className="block relative py-3 px-4 rounded-xl overflow-hidden"
                    >
                      {({ isActive }) => (
                        <>
                          {/* TEXT */}
                          <span
                            className={`
                        relative z-10 font-medium transition
                        ${
                          isActive
                            ? "text-indigo-600"
                            : "text-gray-600 group-hover:text-indigo-600"
                        }
                      `}
                          >
                            {item.name}
                          </span>

                          {/* BACKGROUND */}
                          <span
                            className={`
                        absolute inset-0 rounded-xl bg-indigo-50 transition-all duration-300
                        ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                        }
                      `}
                          />

                          {/* LEFT INDICATOR */}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-indigo-500 rounded-r-full"></span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.08 }}
                  className="px-3 mt-2"
                >
                  <button
                    onClick={() => {
                      navigate("/my-account");
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-xl font-medium text-indigo-600 hover:bg-indigo-100 transition"
                  >
                    My Account
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
