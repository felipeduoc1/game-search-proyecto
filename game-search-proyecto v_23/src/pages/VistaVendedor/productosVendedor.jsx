import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarVendedor from "../../components/SidebarVendedor";
import { productos as productosBase } from "../../validaciones/BDproductos";
import "../../styles/productosVendedor.css";

const ProductosVendedor = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("productosVendedor")) || [];
    const todos = [
      ...productosBase,
      ...guardados.map((p, index) => ({
        id: `local-${index + 1}`,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        stock: p.stock,
        descripcion: p.descripcion,
        imagen: "/img/default-product.png",
      })),
    ];
    setProductos(todos);
  }, []);

  const irACrear = () => navigate("/vendedor/productos/crear");
  const verProducto = (id) => navigate(`/vendedor/productos/ver/${id}`);
  const editarProducto = (id) => navigate(`/vendedor/productos/editar/${id}`);

  return (
    <div className="pv-page-wrapper">
      <SidebarVendedor />

      <main className="pv-main">
        {/* --- Bloque título --- */}
        <header className="pv-header">
          <h1>Gestión de Productos</h1>
        </header>

        {/* --- Bloque botón --- */}
        <div className="pv-create-container">
          <button className="btn-accion crear" onClick={irACrear}>
            ➕ Crear Producto
          </button>
        </div>

        {/* --- Lista de productos --- */}
        <section className="pv-list">
          {productos.length > 0 ? (
            productos.map((p) => (
              <article key={p.id} className="pv-card">
                <div className="pv-card-img">
                  <img src={p.imagen} alt={p.nombre} />
                </div>
                <div className="pv-card-body">
                  <h3 className="pv-card-title">{p.nombre}</h3>
                  <p className="pv-card-desc">{p.descripcion}</p>
                  <p className="pv-card-meta">
                    <strong>Categoría:</strong> {p.categoria}
                  </p>
                  <p className="pv-card-price">
                    ${p.precio ? p.precio.toLocaleString() : "0"}
                  </p>
                  <div className="pv-card-actions">
                    <button
                      className="btn-accion ver"
                      onClick={() => verProducto(p.id)}
                    >
                      👀 Ver
                    </button>
                    <button
                      className="btn-accion editar"
                      onClick={() => editarProducto(p.id)}
                    >
                      ✏️ Editar
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="pv-empty">No hay productos disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductosVendedor;
