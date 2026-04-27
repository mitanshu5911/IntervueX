import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect } from "react";

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      showLoading("Checking authentication...");
    } else {
      hideLoading();
    }
  }, [loading]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;