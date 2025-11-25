import React from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { productos } from "../../validaciones/BDproductos";
import "../../styles/productosAdmin.css";

export default function ProductosAdmin() {
  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="productos-main">
        {/* Recuadro principal del encabezado */}
        <header className="productos-header">
          <h1>Gestión de Productos</h1>
        </header>

        {/* Botón debajo del recuadro */}
        <div className="nuevo-producto-container">
          <Link to="/admin/productos/crear" className="btn-nuevo-producto">
            + Nuevo Producto
          </Link>
        </div>

        {/* Tabla de productos */}
        <section className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Plataforma</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{p.plataforma.toUpperCase()}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                  <td>
                    <Link
                      to={`/admin/productos/ver/${p.id}`}
                      className="btn-secondary"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/admin/productos/editar/${p.id}`}
                      className="btn-warning"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
