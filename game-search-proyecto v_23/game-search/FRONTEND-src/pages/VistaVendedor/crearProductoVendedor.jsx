import React from "react";
import SidebarVendedor from "../../components/SidebarVendedor";
import "../../styles/crearProductoVendedor.css";
import useValidacionesCrearProducto from "../../validaciones/valCrearProducto";

const CrearProductoVendedor = () => {
  useValidacionesCrearProducto();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: document.getElementById("nombre").value,
      categoria: document.getElementById("categoria").value,
      precio: parseFloat(document.getElementById("precio").value),
      stock: parseInt(document.getElementById("stock").value),
      descripcion: document.getElementById("descripcion").value,
    };

    // Guardar temporalmente en localStorage (como en crearProductoAdmin)
    const productosGuardados = JSON.parse(localStorage.getItem("productosVendedor")) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productosVendedor", JSON.stringify(productosGuardados));

    alert("✅ Producto creado correctamente");
    window.location.href = "/vendedor/productos";
  };

  return (
    <div className="vendedor-layout">
      {/* Sidebar reutilizable */}
      <SidebarVendedor />

      {/* Contenido principal */}
      <main className="main-content">
        <header>
          <h1>Crear Nuevo Producto</h1>
        </header>

        <form className="formulario" id="formulario" onSubmit={handleSubmit}>
          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                placeholder="Ej: Mario Odyssey"
                required
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
                required
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
                placeholder="Ej: 299.99"
                required
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
                required
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
              required
            ></textarea>
          </div>

          <div id="submit" className="submit">
            <button type="submit" className="btn-primary">
              Guardar Producto
            </button>
            <a href="/vendedor/productos" className="btn-secondary">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CrearProductoVendedor;
