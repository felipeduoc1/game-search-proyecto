import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/crearProductoAdmin.css";

const CrearProductoAdmin = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  // Estado del formulario
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

  // --- FUNCIÓN DE GUARDADO REAL ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validaciones básicas
    if (!nuevoProducto.nombre || !nuevoProducto.categoria) {
      alert("Por favor completa el Nombre y la Categoría (son obligatorios para Oracle).");
      return;
    }

    setCargando(true);

    // 2. Preparar objeto para el Backend (Java)
    // NOTA: Java espera 'name' y 'genre'. 
    // Precio y Stock no se guardarán en Oracle todavía porque tu tabla GAMES no tiene esas columnas,
    // pero el producto se creará igual.
    const juegoParaBackend = {
      name: nuevoProducto.nombre,
      genre: nuevoProducto.categoria,
      imageUrl: "" // Enviamos vacío para activar la "Imagen Automática" del backend
    };

    try {
      console.log("Enviando a Oracle Cloud...", juegoParaBackend);

      // 3. Petición POST al Gateway (Puerto 8888)
      const response = await fetch("http://localhost:8888/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(juegoParaBackend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta Exitosa:", data);

        alert(`✅ Producto creado exitosamente en la Nube!\nID Asignado: ${data.id}`);

        // Redirigir al panel de administración o al catálogo
        // Nota: Asegúrate de que la ruta "/admin/productos" exista en tu App.jsx
        navigate("/admin/productos");
      } else {
        alert("❌ Error al guardar. El servidor respondió con estado: " + response.status);
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      alert("❌ No se pudo conectar con el Backend (Puerto 8888). Revisa que esté corriendo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header>
          <h1>Crear Nuevo Producto (Oracle Cloud)</h1>
        </header>

        <form onSubmit={handleSubmit} className="formulario" id="formulario">

          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                placeholder="Ej: God of War"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div id="formulario_categoria" className="categoria">
            <label htmlFor="categoria">Categoría</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="categoria"
                placeholder="Ej: Acción"
                value={nuevoProducto.categoria}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div id="formulario_precio" className="precio">
            <label htmlFor="precio">Precio</label>
            <div className="formulario__grupo-input">
              <input
                type="number"
                className="formulario__input"
                id="precio"
                placeholder="Ej: 59990"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
            </div>
            <small style={{ color: "gray" }}>* Dato visual (no persistente en esta versión de BD)</small>
          </div>

          <div id="formulario_stock" className="stock">
            <label htmlFor="stock">Stock</label>
            <div className="formulario__grupo-input">
              <input
                type="number"
                className="formulario__input"
                id="stock"
                placeholder="Ej: 20"
                value={nuevoProducto.stock}
                onChange={handleChange}
              />
            </div>
            <small style={{ color: "gray" }}>* Dato visual</small>
          </div>

          <div id="descripcion" className="descripcion">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              rows="4"
              placeholder="Descripción del juego..."
              value={nuevoProducto.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <div id="submit" className="submit">
            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
              style={{ opacity: cargando ? 0.7 : 1 }}
            >
              {cargando ? "Guardando..." : "Guardar Producto"}
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