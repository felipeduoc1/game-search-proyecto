import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
// Reutilizamos estilos
import "../../styles/crearProductoAdmin.css";

const EdicionProductosAdmin = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // Estado del formulario
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    // Campos visuales (no en BD aun)
    precio: 59990,
    stock: 10,
    descripcion: "",
    imagen: "" // Guardamos la URL de la imagen para no perderla al editar
  });

  // --- 1. CARGAR DATOS DEL JUEGO AL INICIAR ---
  useEffect(() => {
    // GET /api/games/{id}
    fetch(`http://localhost:8888/api/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Juego no encontrado");
        return res.json();
      })
      .then((data) => {
        console.log("Datos para editar:", data);
        setProducto({
          nombre: data.name,
          categoria: data.genre,
          precio: 59990, // Falso
          stock: 20, // Falso
          descripcion: "Descripción importada de Oracle",
          imagen: data.imageUrl // Importante: Guardamos la imagen actual
        });
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error al cargar el juego. Puede que no exista.");
        navigate("/admin/productos");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProducto((prev) => ({ ...prev, [id]: value }));
  };

  // --- 2. GUARDAR CAMBIOS (PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    // Objeto para el Backend Java
    const juegoActualizado = {
      name: producto.nombre,
      genre: producto.categoria,
      imageUrl: producto.imagen // Mantenemos la imagen que tenía (o la que edites si agregas input)
    };

    try {
      console.log("Actualizando ID:", id, juegoActualizado);

      const response = await fetch(`http://localhost:8888/api/games/${id}`, {
        method: "PUT", // Verbo HTTP para actualizar
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(juegoActualizado),
      });

      if (response.ok) {
        alert("✅ Producto actualizado correctamente en Oracle.");
        navigate("/admin/productos");
      } else {
        alert("❌ Error al actualizar. Código: " + response.status);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error de conexión con el Backend.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Cargando datos del juego...</p>
      </main>
    </div>
  );

  return (
    <div className="page-container">
      <SidebarAdmin />
      <main className="main-content">
        <header>
          <h1>Editar Producto (ID: {id})</h1>
        </header>

        <form onSubmit={handleSubmit} className="formulario">

          <div className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                id="nombre"
                className="formulario__input"
                value={producto.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="categoria">
            <label htmlFor="categoria">Categoría</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                id="categoria"
                className="formulario__input"
                value={producto.categoria}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Precio y Stock (Solo visuales) */}
          <div className="precio">
            <label htmlFor="precio">Precio</label>
            <div className="formulario__grupo-input">
              <input
                type="number"
                id="precio"
                className="formulario__input"
                value={producto.precio}
                onChange={handleChange}
              />
            </div>
            <small style={{ color: "gray" }}>* Dato visual</small>
          </div>

          <div className="submit">
            <button
              type="submit"
              className="btn-primary"
              disabled={guardando}
              style={{ opacity: guardando ? 0.7 : 1 }}
            >
              {guardando ? "Guardando..." : "Guardar Cambios"}
            </button>
            <Link to="/admin/productos" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EdicionProductosAdmin;