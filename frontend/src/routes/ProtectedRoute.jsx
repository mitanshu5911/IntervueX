import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      showLoading("Verifying access...");
    } else {
      hideLoading();
    }

    return () => hideLoading()
  }, [loading]);

  if(loading){
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;