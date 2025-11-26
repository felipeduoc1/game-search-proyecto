import { Link, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/verProductosAdmin.css";
import { productos } from "../../validaciones/BDproductos";

export default function VerProductosAdmin() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id)); // ✅ comparar con número

  if (!producto) {
    return (
      <div className="admin-layout">
        <SidebarAdmin />
        <main className="main-content">
          <h1>Producto no encontrado</h1>
          <Link to="/admin/productos" className="btn-secondary">
            Volver
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <main className="main-content">
        <header>
          <h1>Detalle de Producto</h1>
        </header>

        <section className="detalle-producto">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen-producto"
          />
          <h2>{producto.nombre}</h2>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Plataforma:</strong> {producto.plataforma.toUpperCase()}</p>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-CL")}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
        </section>

        <div className="acciones">
          <Link to="/admin/productos" className="btn-secondary">
            Volver
          </Link>
          <Link
            to={`/admin/productos/editar/${producto.id}`}
            className="btn-warning"
          >
            Editar
          </Link>
        </div>
      </main>
    </div>
  );
}
