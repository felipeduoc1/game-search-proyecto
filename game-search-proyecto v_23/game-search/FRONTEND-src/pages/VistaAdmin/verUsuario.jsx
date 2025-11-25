import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/verUsuarios.css";

export default function VerUsuario() {
  const usuario = {
    id: 1,
    nombre: "Carlos Pérez",
    rol: "Administrador",
    email: "carlos@gamesearch.com",
    estado: "Activo",
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <main className="main-content">
        <header>
          <h1>Detalles del Usuario</h1>
        </header>

        <div className="formulario">
          <p>
            <strong>ID:</strong> {usuario.id}
          </p>
          <p>
            <strong>Nombre:</strong> {usuario.nombre}
          </p>
          <p>
            <strong>Rol:</strong> {usuario.rol}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Estado:</strong> {usuario.estado}
          </p>

          <Link to="/admin/usuarios" className="btn-secondary">
            ⬅ Volver
          </Link>
        </div>
      </main>
    </div>
  );
}
