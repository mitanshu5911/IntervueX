import { motion } from "framer-motion";
import { loginWithGoogle } from "../../services/authServices";

const Login = () => {
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="relative w-full min-h-[89vh]  flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="absolute w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl -top-20 -left-20 " />
      <div className="absolute w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl -bottom-20 -right-20" />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-[0_10px_40px_rgba(79,70,229,0.15)] border border-white/40"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight"
        >
          <span className="text-gray-800">Intervue</span>
          <span className="text-indigo-600 ml-1">X</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base"
        >
          Your smart platform for technical interviews
        </motion.p>

        <motion.button
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700 text-sm sm:text-base">
            Continue with Google
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-xs text-gray-400"
        >
          Secure login powered by Google
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
