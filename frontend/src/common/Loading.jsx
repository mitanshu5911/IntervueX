import { motion } from "framer-motion";

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />

        
        <motion.p
          key={message} // ensures animation resets on message change
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-lg font-medium text-gray-700"
        >
          {message}
        </motion.p>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-indigo-500 rounded-full"
            />
          ))}
        </div>

      </div>
    </div>
  );
}