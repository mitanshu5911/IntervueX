import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Loading from "../../common/Loading";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { login } = useAuth();

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        showLoading("Signing you in...");

        const token = searchParams.get("token");
        const userParam = searchParams.get("user");

        if (!token) {
          hideLoading();
          navigate("/login");
          return;
        }

        // save token first
        localStorage.setItem("token", token);

        let user = null;

        // if user exists in params
        if (userParam) {
          try {
            user = JSON.parse(decodeURIComponent(userParam));
          } catch (err) {
            console.error("User parse failed", err);
          }
        }

        // fallback if user missing
        if (!user) {
          hideLoading();
          navigate("/login");
          return;
        }

        login(token, user);

        navigate("/", { replace: true });

      } catch (error) {
        console.error("OAuth login failed:", error);

        localStorage.removeItem("token");

        navigate("/login");
      } finally {
        hideLoading();
      }
    };

    handleAuth();

    return () => hideLoading();
  }, []);

  return <Loading />;
};

export default AuthSuccess;