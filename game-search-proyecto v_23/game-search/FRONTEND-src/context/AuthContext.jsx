import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getStoredSession = () => {
  try {
    const raw = localStorage.getItem("auth-session");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("No se pudo leer la sesión almacenada", err);
    return null;
  }
};

const persistSession = (session) => {
  try {
    if (session) {
      localStorage.setItem("auth-session", JSON.stringify(session));
    } else {
      localStorage.removeItem("auth-session");
    }
  } catch (err) {
    console.warn("No se pudo persistir la sesión", err);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredSession();
    if (stored?.token && stored?.user) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Error de autenticación" }));
      throw new Error(error.message || "No se pudo iniciar sesión");
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    persistSession({ user: data.user, token: data.token });
    return data.user;
  };

  const register = async ({ nombre, email, password, rol = "cliente" }) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, rol }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Error al registrar" }));
      throw new Error(error.message || "No se pudo registrar");
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    persistSession({ user: data.user, token: data.token });
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persistSession(null);
  };

  const hasRole = (roles = []) => {
    if (!user) return false;
    return roles.length === 0 || roles.includes(user.rol);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
      hasRole,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
