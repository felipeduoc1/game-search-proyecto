import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles = [], children }) {
  const { isAuthenticated, user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // mientras leo sesión desde localStorage
    return <div>Cargando sesión...</div>;
  }

  // sin usuario o sin token -> no hay sesión, al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // si la ruta pide roles específicos, los reviso
  if (roles.length > 0) {
    const permitido = hasRole(roles);
    const rolActual = user.rol;

    if (!permitido) {
      console.warn(
        "Acceso denegado. Ruta requiere roles:",
        roles,
        "pero el usuario tiene rol:",
        rolActual
      );
      return <Navigate to="/" replace />;
    }
  }

  // todo ok, muestro el contenido protegido
  return children;
}
