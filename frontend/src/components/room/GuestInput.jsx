import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

const GuestInput = ({ guestList = [], setGuestList }) => {
  const [input, setInput] = useState("");
  const toast = useToast();

  const safeGuestList = Array.isArray(guestList) ? guestList : [];

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addEmail = () => {
    const email = input.trim().toLowerCase();

    if (!email) return;

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (safeGuestList.includes(email)) {
      toast.error("Email already added");
      return;
    }

    setGuestList((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      email,
    ]);

    setInput("");
  };

  const removeEmail = (email) => {
    setGuestList((prev) =>
      (Array.isArray(prev) ? prev : []).filter((e) => e !== email)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  return (
    <div className="space-y-5">

      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter candidate email..."
            className="w-full px-4 py-3 rounded-2xl 
              border border-gray-200 
              bg-white/70 backdrop-blur-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              shadow-sm transition-all"
          />

          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl opacity-0 focus-within:opacity-100 transition pointer-events-none" />
        </div>

        <motion.button
          type="button"
          onClick={addEmail}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-5 py-3 
            rounded-2xl text-white font-medium
            bg-gradient-to-r from-indigo-600 to-indigo-500
            shadow-lg shadow-indigo-500/30
            hover:shadow-indigo-500/50 transition-all"
        >
          <Plus size={16} />
          Add
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-3 min-h-[40px]">
        <AnimatePresence>
          {safeGuestList.map((email) => (
            <motion.div
              key={email}
              layout
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="group flex items-center gap-2 
                px-4 py-2 rounded-full
                bg-gradient-to-r from-indigo-100 to-indigo-50
                border border-indigo-200
                text-indigo-700 text-sm
                shadow-sm hover:shadow-md transition-all"
            >
              <span className="max-w-[160px] truncate">
                {email}
              </span>

              <button
                type="button"
                onClick={() => removeEmail(email)}
                className="opacity-60 group-hover:opacity-100 transition hover:text-red-500"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {safeGuestList.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400"
          >
            No candidates added yet
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default GuestInput;