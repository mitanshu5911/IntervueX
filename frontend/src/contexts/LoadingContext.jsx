import { createContext, useContext, useState } from "react";
import Loading from "../common/Loading";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading..."); // ✅ new

  const showLoading = (msg = "Loading...") => {
    setMessage(msg);  
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setMessage("Loading..."); 
  };

  return (
    <LoadingContext.Provider value={{ isLoading, message, showLoading, hideLoading }}>
      {children}

      {isLoading && <Loading message={message} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);