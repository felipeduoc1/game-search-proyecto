import React from "react";
import SidebarVendedor from "../../components/SidebarVendedor";
import "../../styles/pPrincipalVendedor.css";

const PPrincipalVendedor = () => {
  return (
    <div className="vendedor-layout">
      <SidebarVendedor />
      <div className="main-content">
        <div className="welcome-card">
          <h1>¡Hola, Vendedor!</h1>
          <p>
            Bienvenido al panel de gestión de <strong>GameSearch</strong>.
          </p>
          <p>
            Aquí podrás administrar tus productos y ver su estado en el inventario.
          </p>
        </div>

        <div className="info-cards">
          <div className="card">
            <h3>📦 Productos Activos</h3>
            <p>Administra y actualiza tus listados fácilmente.</p>
          </div>
          <div className="card">
            <h3>📊 Estadísticas</h3>
            <p>Visualiza el rendimiento de tus productos.</p>
          </div>
          <div className="card">
            <h3>💬 Comentarios</h3>
            <p>Revisa la opinión de tus compradores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPrincipalVendedor;
