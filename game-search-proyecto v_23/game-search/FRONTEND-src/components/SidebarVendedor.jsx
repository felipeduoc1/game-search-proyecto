import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SidebarVendedor.css";

const SidebarVendedor = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-vendedor">
      <div className="sidebar-header">
        <h2 className="logo">GameSearch</h2>
      </div>

      <nav className="menu">
        <Link
          to="/vendedor"
          className={location.pathname === "/vendedor" ? "active" : ""}
        >
          🏠 <span>Inicio</span>
        </Link>

        <Link
          to="/vendedor/productos"
          className={location.pathname === "/vendedor/productos" ? "active" : ""}
        >
          🎮 <span>Mis Productos</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <a href="#" className="perfil">
          👤 <span>Perfil</span>
        </a>
        <Link to="/" className="btn-volver">
          ⬅️ <span>Volver a Inicio</span>
        </Link>
      </div>
    </aside>
  );
};

export default SidebarVendedor;
