import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/edicionProductosVendedor.css";
import { productos } from "../../validaciones/BDproductos";
import useValidacionesEditarProducto from "../../validaciones/valEditarProducto";

const EdicionProductosAdmin = () => {
  const { id } = useParams(); // ID desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useValidacionesEditarProducto(); // tus validaciones personalizadas

  // Buscar el producto al cargar
  useEffect(() => {
    const encontrado = productos.find((p) => p.id === parseInt(id));
    if (encontrado) {
      setProducto({ ...encontrado });
    } else {
      console.warn("Producto no encontrado");
      navigate("/admin/productos");
    }
  }, [id, navigate]);

  // Actualizar campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProducto((prev) => ({ ...prev, [id]: value }));
  };

  // Guardar cambios (por ahora solo modifica el array en memoria)
  const handleSubmit = (e) => {
    e.preventDefault();
    const index = productos.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      productos[index] = { ...producto };
      alert("✅ Producto actualizado correctamente (simulado)");
      navigate("/admin/productos");
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header>
          <h1>Editar Producto</h1>
        </header>

        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>
            <p className="error" id="error-nombre"></p>
          </div>

          <div id="formulario_categoria" className="categoria">
            <label htmlFor="categoria">Categoría</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="categoria"
                value={producto.categoria}
                onChange={handleChange}
              />
            </div>
            <p className="error" id="error-categoria"></p>
          </div>

          <div id="formulario_precio" className="precio">
            <label htmlFor="precio">Precio</label>
            <div className="formulario__grupo-input">
              <input
                type="number"
                className="formulario__input"
                id="precio"
                value={producto.precio}
                onChange={handleChange}
              />
            </div>
            <p className="error" id="error-precio"></p>
          </div>

          <div id="formulario_stock" className="stock">
            <label htmlFor="stock">Stock</label>
            <div className="formulario__grupo-input">
              <input
                type="number"
                className="formulario__input"
                id="stock"
                value={producto.stock || 0}
                onChange={handleChange}
              />
            </div>
            <p className="error" id="error-stock"></p>
          </div>

          <div id="descripcion" className="descripcion">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              rows="4"
              value={producto.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <div id="submit" className="submit">
            <button type="submit" className="btn-primary">
              Guardar Cambios
            </button>
            <Link to="/admin/productos" className="btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EdicionProductosAdmin;
