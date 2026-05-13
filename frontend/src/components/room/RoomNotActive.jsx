import { motion, AnimatePresence } from "framer-motion";

const formatTime = (ms) => {
  if (!ms || ms <= 0) return null;

  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const TimeBox = ({ value, label }) => (
  <motion.div
    layout
    className="flex flex-col items-center bg-indigo-50 px-4 py-3 rounded-xl min-w-17.5"
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl font-bold text-indigo-600"
      >
        {value}
      </motion.span>
    </AnimatePresence>

    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </motion.div>
);

const RoomNotActive = ({room, pendingTime}) => {
    const time = formatTime(pendingTime);

  return (
    

  
    <div className="w-full flex items-center justify-center bg-linear-to-br from-indigo-50 to-white px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full text-center"
      >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-indigo-600 mb-3">
          Waiting Room ⏳
        </h1>

        {/* ROOM TITLE */}
        <h2 className="text-xl font-semibold text-gray-800">
          {room.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 mt-2 text-sm">
          {room.description || "Please wait, your interview will begin shortly."}
        </p>

        {/* INFO */}
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>
            👤 <b>Interviewer:</b> {room.interviewer?.name || "Host"}
          </p>

          <p>
            📅 <b>Scheduled:</b>{" "}
            {new Date(room.scheduledAt).toLocaleString()}
          </p>
        </div>

        {/* COUNTDOWN */}
        <div className="mt-8 flex justify-center gap-3 flex-wrap">

          {!time ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-green-600"
            >
              Starting...
            </motion.div>
          ) : (
            <>
              {time.days > 0 && <TimeBox value={time.days} label="Days" />}
              <TimeBox value={time.hours} label="Hours" />
              <TimeBox value={time.minutes} label="Minutes" />
              <TimeBox value={time.seconds} label="Seconds" />
            </>
          )}

        </div>

        {/* NOTE */}
        <p className="mt-6 text-xs text-gray-400">
          The meeting will start automatically when the time is reached.
        </p>

      </motion.div>
    </div>
  )
}

export default RoomNotActive