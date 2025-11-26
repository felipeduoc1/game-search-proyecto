import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/crearProductoAdmin.css";
import { productos } from "../../validaciones/BDproductos";
import useValidacionesCrearProducto from "../../validaciones/valCrearProducto";

const CrearProductoAdmin = () => {
  useValidacionesCrearProducto();
  const navigate = useNavigate();

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos mínimos
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      alert("Por favor completa los campos obligatorios (nombre y precio).");
      return;
    }

    // Crear nuevo producto con ID automático
    const nuevo = {
      id: productos.length + 1,
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio),
      plataforma: "sin-especificar", // puedes agregar select luego
      categoria: nuevoProducto.categoria,
      stock: parseInt(nuevoProducto.stock) || 0,
      imagen: null, // si luego agregas subida de imagen
    };

    // Agregar al arreglo de productos (simulación local)
    productos.push(nuevo);

    alert("✅ Producto creado exitosamente (simulado)");
    navigate("/admin/productos");
  };

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header>
          <h1>Crear Nuevo Producto</h1>
        </header>

        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                placeholder="Ej: Mario Odyssey"
                value={nuevoProducto.nombre}
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
                placeholder="Ej: Nintendo Switch"
                value={nuevoProducto.categoria}
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
                placeholder="Ej: 29990"
                value={nuevoProducto.precio}
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
                placeholder="Ej: 15"
                value={nuevoProducto.stock}
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
              placeholder="Escribe una breve descripción del producto..."
              value={nuevoProducto.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <div id="submit" className="submit">
            <button type="submit" className="btn-primary">
              Guardar Producto
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

export default CrearProductoAdmin;
