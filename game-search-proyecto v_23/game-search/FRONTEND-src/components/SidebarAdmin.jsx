import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/SidebarAdmin.css";

export default function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  // Detecta si una ruta está activa
  const isActive = (path) => location.pathname.includes(path);

  // Función de cierre de sesión
  const handleLogout = () => {
    // Limpia datos de sesión si existen
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    // Redirige a la página principal
    navigate("/");
  };

  return (
    <aside className="sidebar-admin">
      <h2 className="titulo-sidebar">Panel Admin</h2>

      <nav className="menu">
        <Link
          to="/admin"
          className={
            isActive("/admin") &&
            !isActive("/admin/productos") &&
            !isActive("/admin/usuarios")
              ? "active"
              : ""
          }
        >
          🏠 <span>Inicio</span>
        </Link>

        <Link
          to="/admin/productos"
          className={isActive("/admin/productos") ? "active" : ""}
        >
          🎮 <span>Productos</span>
        </Link>

        <Link
          to="/admin/usuarios"
          className={isActive("/admin/usuarios") ? "active" : ""}
        >
          👨‍💼 <span>Empleados</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/perfil">
          👤 <span>Perfil</span>
        </Link>

        {/* Botón de cierre de sesión */}
        <button onClick={handleLogout} className="logout-btn">
          🚪 <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
