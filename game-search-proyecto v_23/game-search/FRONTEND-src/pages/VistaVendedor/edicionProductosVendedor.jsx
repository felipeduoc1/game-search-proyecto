import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarVendedor from "../../components/SidebarVendedor";
import "../../styles/edicionProductosVendedor.css";
import useValidacionesEditarProducto from "../../validaciones/valEditarProducto";
import { productos } from "../../validaciones/BDproductos"; // ✅ para buscar el producto según ID

const EdicionProductosVendedor = () => {
  useValidacionesEditarProducto();

  // ✅ obtener el ID de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ buscar el producto correspondiente
  const producto = productos.find((p) => p.id === parseInt(id));

  // ✅ si no se encuentra el producto
  if (!producto) {
    return (
      <div className="vendedor-layout">
        <SidebarVendedor />
        <main className="main-content">
          <h2>Producto no encontrado</h2>
          <button className="btn-secondary" onClick={() => navigate("/vendedor/productos")}>
            Volver
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="vendedor-layout">
      <SidebarVendedor />

      <main className="main-content">
        <header>
          <h1>Editar Producto: {producto.nombre}</h1>
        </header>

        <form className="formulario" id="formulario">
          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                defaultValue={producto.nombre}
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
                defaultValue={producto.categoria}
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
                defaultValue={producto.precio}
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
                defaultValue={producto.stock}
              />
            </div>
            <p className="error" id="error-stock"></p>
          </div>

          <div id="descripcion" className="descripcion">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              rows="4"
              defaultValue={producto.descripcion}
            ></textarea>
          </div>

          <div id="submit" className="submit">
            <button type="submit" className="btn-primary">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/vendedor/productos")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EdicionProductosVendedor;
