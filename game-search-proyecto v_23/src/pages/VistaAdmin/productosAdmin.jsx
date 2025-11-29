import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/productosAdmin.css";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- 1. CARGAR DATOS REALES (READ) ---
  const cargarProductos = () => {
    fetch("http://localhost:8888/api/games")
      .then((response) => {
        if (!response.ok) throw new Error("Error al conectar con el Gateway");
        return response.json();
      })
      .then((data) => {
        console.log("Admin - Datos recibidos:", data);
        const productosMapeados = data.map((game) => ({
          id: game.id,
          nombre: game.name,
          categoria: game.genre || "General",
          plataforma: "Multiplataforma", // Dato simulado visualmente
          precio: 59990, // Dato simulado visualmente
        }));
        setProductos(productosMapeados);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando la lista:", error);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // --- 2. ELIMINAR PRODUCTO (DELETE) ---
  const eliminarProducto = async (id) => {
    // Confirmación de seguridad
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el juego ID: ${id}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      // Petición DELETE al Gateway (Puerto 8888) -> Microservicio
      const response = await fetch(`http://localhost:8888/api/games/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ Producto eliminado correctamente de la Base de Datos.");
        // Recargamos la lista para que desaparezca visualmente
        cargarProductos();
      } else {
        alert("❌ Error al eliminar. El servidor respondió: " + response.status);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ Error de conexión al intentar eliminar.");
    }
  };

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header style={{ marginBottom: "2rem" }}>
          <h1>Gestión de Productos (Oracle Cloud)</h1>
        </header>

        {/* Botón Nuevo Producto */}
        <div style={{ marginBottom: "20px" }}>
          <Link to="/admin/productos/crear" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', display: 'inline-block' }}>
            + Nuevo Producto
          </Link>
        </div>

        {cargando ? (
          <p style={{ color: "white", textAlign: "center" }}>Cargando datos...</p>
        ) : (
          <div className="tabla-container">
            <table className="tabla-admin">
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
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                      No hay productos registrados en la base de datos.
                    </td>
                  </tr>
                ) : (
                  productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.plataforma}</td>
                      <td>${producto.precio.toLocaleString("es-CL")}</td>
                      <td>
                        <div className="acciones-btns" style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          <button className="btn-ver">Ver</button>

                          {/* BOTÓN EDITAR: Redirige a la página de edición con el ID */}
                          <Link
                            to={`/admin/productos/editar/${producto.id}`}
                            className="btn-editar"
                            style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            Editar
                          </Link>

                          {/* BOTÓN ELIMINAR: Llama a la función real */}
                          <button
                            className="btn-eliminar"
                            onClick={() => eliminarProducto(producto.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductosAdmin;