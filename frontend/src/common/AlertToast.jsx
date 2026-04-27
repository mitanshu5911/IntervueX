import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const AlertToast = ({ toast }) => {

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed top-6 right-6 z-9999">

      <AnimatePresence>

        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.35 }}
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white
          ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
        >

          {isSuccess ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}

          <span className="font-medium">{toast.message}</span>

        </motion.div>

      </AnimatePresence>

    </div>
  );
};

export default AlertToast;