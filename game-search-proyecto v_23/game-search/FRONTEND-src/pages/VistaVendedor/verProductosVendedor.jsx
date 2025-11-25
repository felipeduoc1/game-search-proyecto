import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarVendedor from "../../components/SidebarVendedor";
import { productos } from "../../validaciones/BDproductos";
import "../../styles/verProductosVendedor.css";

const VerProductosVendedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar producto según el ID recibido por la URL
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="vendedor-layout">
        <SidebarVendedor />
        <main className="main-content">
          <header className="detalle-header">
            <h1>Producto no encontrado</h1>
          </header>

          <div className="acciones">
            <button
              className="btn-volver"
              onClick={() => navigate("/vendedor/productos")}
            >
              ← Volver
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="vendedor-layout">
      {/* Sidebar reutilizable */}
      <SidebarVendedor />

      {/* Contenido principal */}
      <main className="main-content">
        <header className="detalle-header">
          <h1>Detalle de Producto</h1>
        </header>

        <section className="detalle-producto">
          {/* Imagen del producto */}
          <div className="detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>

          {/* Información del producto */}
          <div className="detalle-info">
            <h2>{producto.nombre}</h2>
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p>
              <strong>Plataforma:</strong> {producto.plataforma}
            </p>
            <p>
              <strong>Precio:</strong> ${producto.precio.toLocaleString()}
            </p>
            <p>
              <strong>Descripción:</strong> {producto.descripcion}
            </p>
          </div>
        </section>

        {/* Botones de acción */}
        <div className="acciones">
          <button
            className="btn-volver"
            onClick={() => navigate("/vendedor/productos")}
          >
            Volver
          </button>

          <button
            className="btn-editar"
            onClick={() =>
              navigate(`/vendedor/productos/editar/${producto.id}`)
            }
          >
            Editar
          </button>
        </div>
      </main>
    </div>
  );
};

export default VerProductosVendedor;
