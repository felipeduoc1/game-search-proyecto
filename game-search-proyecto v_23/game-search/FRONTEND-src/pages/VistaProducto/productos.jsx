import React from "react";
import Header from "../../components/Header";
import "../../styles/productos.css";
import { productos } from "../../validaciones/BDproductos";
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
  const { isAuthenticated } = useAuth();
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

  // Estados para filtros
  const [plataforma, setPlataforma] = React.useState("todas");
  const [categoria, setCategoria] = React.useState("todas");
  const [orden, setOrden] = React.useState("precio");
  const [busqueda, setBusqueda] = React.useState("");

  const [productoSeleccionado, setProductoSeleccionado] = React.useState(null);

  // Filtrado y ordenamiento
  const productosFiltrados = React.useMemo(() => {
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
      resultados = resultados.filter(
        (p) =>
          (p.nombre || "").toLowerCase().includes(q) ||
          (p.descripcion || "").toLowerCase().includes(q)
      );
    }

    if (orden === "precio") resultados.sort((a, b) => a.precio - b.precio);
    if (orden === "recientes")
      resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    if (orden === "valorados")
      resultados.sort((a, b) => (b.valoracion || 0) - (a.valoracion || 0));

    return resultados;
  }, [plataforma, categoria, orden, busqueda]);

  // 🔹 Verificar sesión antes de agregar al carrito
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

  return (
    <>
      <Header />
      <main className="catalogo">
        <h1>Nuestro catálogo de videojuegos</h1>

        <div className="catalogo-grid">
          <aside className="filtros">
            <h2>Filtros</h2>

            <label htmlFor="filtro-plataforma">Plataforma</label>
            <select
              id="filtro-plataforma"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="ps5">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="switch">Nintendo Switch</option>
              <option value="pc">PC</option>
            </select>

            <label htmlFor="filtro-categoria">Categoría</label>
            <select
              id="filtro-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="accion">Acción</option>
              <option value="aventura">Aventura</option>
              <option value="deportes">Deportes</option>
              <option value="rpg">RPG</option>
              <option value="estrategia">Estrategia</option>
            </select>

            <label htmlFor="filtro-orden">Ordenar por</label>
            <select
              id="filtro-orden"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="precio">Precio</option>
              <option value="recientes">Más recientes</option>
              <option value="valorados">Mejor valorados</option>
            </select>

            <label htmlFor="busqueda">Buscar</label>
            <input
              type="text"
              id="busqueda"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </aside>

          {/* 🧩 Productos */}
          <section className="productos-grid" id="productos-container">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="producto-card">
                <img
                  src={imagenes[producto.imagen] || producto.imagen}
                  alt={producto.nombre}
                  onClick={() => setProductoSeleccionado(producto)}
                  style={{ cursor: "pointer" }}
                />
                <h3
                  onClick={() => setProductoSeleccionado(producto)}
                  style={{ cursor: "pointer" }}
                >
                  {producto.nombre}
                </h3>
                <p className="descripcion">{producto.descripcion}</p>
                <p className="precio">
                  ${producto.precio.toLocaleString("es-CL")}
                </p>

                <button
                  className="btn-agregar"
                  onClick={() => handleAgregarCarrito(producto)}
                >
                  🛒 Agregar
                </button>
              </div>
            ))}
          </section>
        </div>

        {/* 🪟 Modal detalle */}
        {productoSeleccionado && (
          <div className="modal-detalle">
            <div className="modal-contenido-detalle">
              <button
                className="cerrar-modal"
                onClick={() => setProductoSeleccionado(null)}
              >
                ✖
              </button>
              <img
                src={
                  imagenes[productoSeleccionado.imagen] ||
                  productoSeleccionado.imagen
                }
                alt={productoSeleccionado.nombre}
              />
              <div className="detalle-info">
                <h2>{productoSeleccionado.nombre}</h2>
                <p>{productoSeleccionado.descripcion}</p>
                <p className="precio-detalle">
                  Precio: $
                  {productoSeleccionado.precio.toLocaleString("es-CL")}
                </p>
                <p>Plataforma: {productoSeleccionado.plataforma}</p>
                <p>Categoría: {productoSeleccionado.categoria}</p>
                <button
                  className="btn-agregar"
                  onClick={() => handleAgregarCarrito(productoSeleccionado)}
                >
                  🛒 Agregar al carrito
                </button>
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
