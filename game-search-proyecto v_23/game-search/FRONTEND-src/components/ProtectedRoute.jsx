import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles = [], children }) {
  const { isAuthenticated, user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Cargando sesión...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/" replace />;
  }

  return typeof children === "function" ? children(user) : children;
}
