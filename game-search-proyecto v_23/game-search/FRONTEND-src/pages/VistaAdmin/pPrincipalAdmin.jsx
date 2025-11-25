import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/pPrincipalAdmin.css";

const PPrincipalAdmin = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="admin-main">
        <section className="bienvenida">
          <h1>¡Hola, Administrador!</h1>
          <p>
            Bienvenido al panel de control de <strong>GameSearch</strong>.
          </p>
          <p>
            Desde aquí podrás gestionar órdenes, inventario, empleados, clientes y mucho más.
          </p>
        </section>

        <section className="resumen">
          <div className="card">
            <h2>📦 Productos</h2>
            <p>Gestiona y controla tu inventario.</p>
          </div>
          <div className="card">
            <h2>👨‍💼 Empleados</h2>
            <p>Administra cuentas y permisos del equipo.</p>
          </div>
          <div className="card">
            <h2>🛒 Ventas</h2>
            <p>Consulta estadísticas y órdenes recientes.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PPrincipalAdmin;
