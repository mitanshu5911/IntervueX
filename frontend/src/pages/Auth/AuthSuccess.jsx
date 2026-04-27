import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import Loading from '../../common/Loading';

const AuthSuccess = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const {login} = useAuth();
   const {showLoading, hideLoading} = useLoading();

   
     useEffect(() => {
    const handleAuth = async () => {
      try {
        showLoading("Signing you in...");

        const token = searchParams.get("token");
        const userParam = searchParams.get("user");

        if (!token || !userParam) {
          hideLoading();
          navigate("/login");
          return;
        }

        const user = JSON.parse(decodeURIComponent(userParam));

        setTimeout(() => {
          login(token, user);
          hideLoading();
          navigate("/", { replace: true });
        }, 1000);

      } catch (error) {
        console.error("OAuth login failed:", error);
        hideLoading();
        navigate("/login");
      }
    };

    handleAuth();

    return () => hideLoading();
  }, [searchParams]);

  return (
     <Loading/>
  )
}

export default AuthSuccess