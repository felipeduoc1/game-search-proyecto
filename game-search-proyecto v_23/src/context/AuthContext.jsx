import { createContext, useState, useContext, useEffect, useMemo } from "react";

const AuthContext = createContext();

// ✅ CORRECCIÓN: Volvemos al Gateway Local (Tu puerto seguro)
const API_URL = "http://localhost:8888";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // Cargar sesión guardada al iniciar
  useEffect(() => {
    const storedSession = localStorage.getItem("auth-session");
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setUser(parsed.user);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("auth-session");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Intentando login en:", API_URL);

      const response = await fetch(`${API_URL}/api/users`);

      if (!response.ok) throw new Error("No se pudo conectar con el Backend");

      const users = await response.json();

      // --- CÓDIGO ESPÍA (AGREGA ESTO) ---
      console.log("🔍 Usuarios descargados de Oracle:", users);
      console.log("📧 Email buscado:", email);
      console.log("🔑 Contraseña buscada:", password);
      // ----------------------------------

      // Buscamos coincidencia manual (Asegúrate de que las propiedades sean 'email' y 'password')
      // A veces Oracle/Java devuelve 'correo' o 'contrasena' si no definiste bien el JSON.
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Asignar rol simulado basado en el correo
        let rol = "cliente";
        if (email.toLowerCase().includes("admin")) rol = "admin";
        if (email.toLowerCase().includes("vendedor")) rol = "vendedor";

        const userWithRol = { ...foundUser, rol };

        setUser(userWithRol);
        setIsAuthenticated(true);
        localStorage.setItem("auth-session", JSON.stringify({ user: userWithRol }));
        return userWithRol;
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error Login:", error);
      throw error;
    }
  };

  // --- REGISTRO (POST al Gateway -> Oracle) ---
  const register = async ({ nombre, email, password, rol = "cliente" }) => {
    try {
      console.log("Enviando registro al Gateway...");

      // ✅ CORRECCIÓN: Apuntamos a /api/users/register del Gateway
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos el objeto tal como lo espera tu clase User en Java
        body: JSON.stringify({
          username: nombre,
          email: email,
          password: password,
          rol: rol
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Registrado exitosamente:", data);

      // Auto-login después del registro
      const newUser = { ...data, rol: "cliente" };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth-session", JSON.stringify({ user: newUser }));

      return newUser;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth-session");
  };

  const hasRole = (roles = []) => {
    if (!user) return false;
    if (!roles.length) return true;
    return roles.includes(user.rol);
  };

  const value = useMemo(() => ({
    user, isAuthenticated, login, register, logout, hasRole, isLoading
  }), [user, isAuthenticated, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);