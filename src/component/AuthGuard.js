import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const allowPublicRoutes = ["/create-user"];
  localStorage.setItem("routing", location?.pathname);

  if (loading) {
    return (
      <div className="loader-routing ">
        <div className="logo-container">
          <Logo logo="/assets/logo.png" />
        </div>
      </div>
    );
  }
  if (allowPublicRoutes.includes(location.pathname)) {
    return children;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthGuard;
