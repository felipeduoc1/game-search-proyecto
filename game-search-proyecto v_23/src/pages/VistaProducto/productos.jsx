import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import "../../styles/productos.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// 🖼️ Importación de imágenes
import EldenRing from "../../img/Elden-Ring.webp";
import Zelda from "../../img/Zelda.webp";
import CODMW from "../../img/COD-MW.jpg";
import FIFA23 from "../../img/FIFA-23.jpg";
import Cyberpunk from "../../img/Cyberpunk.webp";
import Horizon from "../../img/Horizon.webp";
import Halo from "../../img/Halo.jpg";
import AnimalCrossing from "../../img/Animal-Crossing.webp";
import FinalFantasy from "../../img/Final-Fantasy.webp";
import Starfield from "../../img/Starfield.jpg";
import ZeldaEchoes from "../../img/Zelda-Echoes.webp";
import SpiderMan from "../../img/SpiderMan.avif";

export default function Productos() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const imagenes = {
    "img/Elden-Ring.webp": EldenRing,
    "img/Zelda.webp": Zelda,
    "img/COD-MW.jpg": CODMW,
    "img/FIFA-23.jpg": FIFA23,
    "img/Cyberpunk.webp": Cyberpunk,
    "img/Horizon.webp": Horizon,
    "img/Halo.jpg": Halo,
    "img/Animal-Crossing.webp": AnimalCrossing,
    "img/Final-Fantasy.webp": FinalFantasy,
    "img/Starfield.jpg": Starfield,
    "img/Zelda-Echoes.webp": ZeldaEchoes,
    "img/SpiderMan.avif": SpiderMan,
  };

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [plataforma, setPlataforma] = useState("todas");
  const [categoria, setCategoria] = useState("todas");
  const [orden, setOrden] = useState("precio");
  const [busqueda, setBusqueda] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [reseñas, setReseñas] = useState([]); // Inicializado como array vacío
  const [nuevaReseña, setNuevaReseña] = useState("");
  const [nuevoRating, setNuevoRating] = useState(5);
  const [enviandoReseña, setEnviandoReseña] = useState(false);

  // --- 1. CARGAR JUEGOS ---
  useEffect(() => {
    fetch("http://localhost:8888/api/games")
      .then((response) => {
        if (!response.ok) throw new Error("Error en Games Service");
        return response.json();
      })
      .then((data) => {
        const productosMapeados = Array.isArray(data) ? data.map((game) => ({
          id: game.id,
          nombre: game.name,
          descripcion: "Juego importado desde Oracle Database.",
          precio: 59990,
          imagen: game.imageUrl,
          categoria: game.genre || "General",
          plataforma: "Multiplataforma",
          valoracion: 5,
          fecha: new Date().toISOString()
        })) : [];
        setProductos(productosMapeados);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando juegos:", error);
        setProductos([]); // Evitar crash si falla
        setCargando(false);
      });
  }, []);

  // --- 2. CARGAR RESEÑAS (BLINDADO) ---
  useEffect(() => {
    if (productoSeleccionado) {
      console.log("Cargando reseñas para:", productoSeleccionado.nombre);

      fetch(`http://localhost:8888/api/reviews/game/${productoSeleccionado.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en Reviews Service");
          return res.json();
        })
        .then((data) => {
          // BLINDAJE: Verificar si es un array antes de asignarlo
          if (Array.isArray(data)) {
            setReseñas(data);
          } else {
            console.warn("El backend no devolvió una lista:", data);
            setReseñas([]);
          }
        })
        .catch((err) => {
          console.error("Error cargando reseñas:", err);
          setReseñas([]); // Si falla, lista vacía, NO crash
        });
    } else {
      setReseñas([]);
      setNuevaReseña("");
      setNuevoRating(5);
    }
  }, [productoSeleccionado]);

  // --- 3. ENVIAR RESEÑA ---
  const handleEnviarReseña = async () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para comentar.");
      navigate("/login");
      return;
    }
    if (!nuevaReseña.trim()) {
      alert("Por favor escribe un comentario.");
      return;
    }

    setEnviandoReseña(true);

    const reviewPayload = {
      gameId: productoSeleccionado.id,
      username: user?.username || user?.email || "Usuario",
      comment: nuevaReseña,
      rating: nuevoRating
    };

    try {
      const res = await fetch("http://localhost:8888/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload)
      });

      if (res.ok) {
        const reviewCreada = await res.json();
        // Agregamos la nueva reseña a la lista de forma segura
        setReseñas(prev => [...prev, reviewCreada]);
        setNuevaReseña("");
        setNuevoRating(5);
        alert("¡Gracias por tu opinión!");
      } else {
        alert("Error al guardar la reseña.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con Review Service.");
    } finally {
      setEnviandoReseña(false);
    }
  };

  const productosFiltrados = useMemo(() => {
    let resultados = (productos || []).slice();
    if (plataforma !== "todas") {
      resultados = resultados.filter((p) =>
        (p.plataforma || "").toLowerCase().includes(plataforma.toLowerCase())
      );
    }
    if (categoria !== "todas") {
      resultados = resultados.filter((p) =>
        (p.categoria || "").toLowerCase().includes(categoria.toLowerCase())
      );
    }
    const q = busqueda.trim().toLowerCase();
    if (q) {
      resultados = resultados.filter((p) =>
        (p.nombre || "").toLowerCase().includes(q) ||
        (p.descripcion || "").toLowerCase().includes(q)
      );
    }
    if (orden === "precio") resultados.sort((a, b) => a.precio - b.precio);
    return resultados;
  }, [plataforma, categoria, orden, busqueda, productos]);

  const handleAgregarCarrito = (producto) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i) => i.id === producto.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      cart.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Producto agregado al carrito!");
  };

  const obtenerImagen = (rutaImagen) => {
    if (!rutaImagen) return "https://via.placeholder.com/300?text=No+Image";
    if (rutaImagen.startsWith("http")) return rutaImagen;
    return imagenes[rutaImagen] || "https://via.placeholder.com/300?text=Sin+Imagen";
  };

  const renderEstrellas = (rating) => {
    const stars = Math.max(0, Math.min(5, rating || 0));
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <>
      <Header />
      <main className="catalogo">
        <h1>Nuestro catálogo de videojuegos</h1>

        {cargando && (
          <div className="alert alert-info text-center">
            Cargando datos desde Oracle Cloud...
          </div>
        )}

        <div className="catalogo-grid">
          <aside className="filtros">
            <h2>Filtros</h2>
            <label>Plataforma</label>
            <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="Multiplataforma">Multiplataforma</option>
              <option value="ps5">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="switch">Nintendo Switch</option>
              <option value="pc">PC</option>
            </select>
            <label>Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="Action-adventure">Aventura/Acción</option>
              <option value="RPG">RPG</option>
              <option value="Simulation">Simulación</option>
              <option value="accion">Acción</option>
              <option value="deportes">Deportes</option>
              <option value="estrategia">Estrategia</option>
            </select>
            <label>Ordenar por</label>
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="precio">Precio</option>
              <option value="recientes">Más recientes</option>
              <option value="valorados">Mejor valorados</option>
            </select>
            <label>Buscar</label>
            <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </aside>

          <section className="productos-grid">
            {!cargando && productosFiltrados.length === 0 && <p>No se encontraron juegos.</p>}
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="producto-card">
                <img
                  src={obtenerImagen(producto.imagen)}
                  alt={producto.nombre}
                  onClick={() => setProductoSeleccionado(producto)}
                  style={{ cursor: "pointer" }}
                />
                <h3 onClick={() => setProductoSeleccionado(producto)} style={{ cursor: "pointer" }}>
                  {producto.nombre}
                </h3>
                <p className="descripcion">{producto.descripcion}</p>
                <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>
                <button className="btn-agregar" onClick={() => handleAgregarCarrito(producto)}>🛒 Agregar</button>
              </div>
            ))}
          </section>
        </div>

        {/* Modal Detalle */}
        {productoSeleccionado && (
          <div className="modal-detalle">
            <div className="modal-contenido-detalle">
              <button className="cerrar-modal" onClick={() => setProductoSeleccionado(null)}>✖</button>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <img
                  src={obtenerImagen(productoSeleccionado.imagen)}
                  alt={productoSeleccionado.nombre}
                  style={{ width: '40%', minWidth: '200px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div className="detalle-info">
                  <h2>{productoSeleccionado.nombre}</h2>
                  <p>{productoSeleccionado.descripcion}</p>
                  <p className="precio-detalle">Precio: ${productoSeleccionado.precio.toLocaleString("es-CL")}</p>
                  <p>Plataforma: {productoSeleccionado.plataforma}</p>
                  <button className="btn-agregar" onClick={() => handleAgregarCarrito(productoSeleccionado)}>
                    🛒 Agregar al carrito
                  </button>
                </div>
              </div>

              <div className="seccion-resenas">
                <h3>Opiniones de la Comunidad</h3>

                <div className="lista-resenas" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {/* BLINDAJE: Verificamos que sea un array antes de hacer map */}
                  {Array.isArray(reseñas) && reseñas.length > 0 ? (
                    reseñas.map((rev) => (
                      <div key={rev.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #444' }}>
                        <strong style={{ color: '#4cd137' }}>{rev.username || "Anónimo"}</strong>
                        <span style={{ color: 'gold', marginLeft: '10px' }}>
                          {renderEstrellas(rev.rating)}
                        </span>
                        <p style={{ margin: '5px 0', color: '#fff' }}>{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#ccc' }}>Aún no hay reseñas o no se pudieron cargar.</p>
                  )}
                </div>

                {isAuthenticated ? (
                  <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '10px' }}>Escribe tu opinión</h4>

                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#ddd', marginRight: '10px' }}>Calificación:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setNuevoRating(star)}
                          style={{
                            cursor: 'pointer',
                            color: star <= nuevoRating ? 'gold' : 'gray',
                            fontSize: '24px',
                            marginRight: '5px'
                          }}
                          title={`${star} estrellas`}
                        >
                          ★
                        </span>
                      ))}
                      <span style={{ color: 'gold', marginLeft: '10px', fontWeight: 'bold' }}>{nuevoRating}/5</span>
                    </div>

                    <textarea
                      rows="3"
                      style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#222', color: 'white', border: '1px solid #555', fontSize: '1rem' }}
                      placeholder="¿Qué te pareció el juego?"
                      value={nuevaReseña}
                      onChange={(e) => setNuevaReseña(e.target.value)}
                    />

                    <button
                      onClick={handleEnviarReseña}
                      disabled={enviandoReseña}
                      style={{ marginTop: '10px', padding: '10px 20px', background: '#6c5ce7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {enviandoReseña ? "Enviando..." : "Publicar Reseña"}
                    </button>
                  </div>
                ) : (
                  <p style={{ color: '#aaa', fontStyle: 'italic', marginTop: '20px' }}>
                    <a onClick={() => navigate("/login")} style={{ color: '#4cd137', cursor: 'pointer', textDecoration: 'underline' }}>Inicia sesión</a> para dejar una reseña.
                  </p>
                )}
              </div>

            </div>
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2025 GameSearch. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}