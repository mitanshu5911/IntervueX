import { createContext, useContext, useState } from "react";
import AlertToast from "../common/AlertToast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {

    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  const success = (message) => showToast(message, "success");

  const error = (message) => showToast(message, "error");

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <AlertToast toast={toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);