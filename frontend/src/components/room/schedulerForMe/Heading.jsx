import { motion } from "framer-motion"
const Heading = () => {
  return (
    <div className="relative pl-5 overflow-hidden">
        
        <div className="absolute left-0 top-0 w-1 h-full bg-indigo-600 z-10" />

        <motion.div
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col"
        >
          
          <motion.h1
            initial={{ x: -16 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl text-gray-900 font-semibold"
          >
            Meetings For <span className="text-indigo-600">You</span>
          </motion.h1>

          <motion.span
            initial={{ x: -14, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm text-gray-400"
          >
            View and join interviews scheduled for you
          </motion.span>

        </motion.div>
      </div>
  )
}

export default Heading