import React from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/usuarios.css";

export default function Usuarios() {
  const usuarios = [
    { id: 1, nombre: "Carlos Pérez", rol: "Administrador", email: "carlos@gamesearch.com" },
    { id: 2, nombre: "María López", rol: "Vendedor", email: "maria@gamesearch.com" },
    { id: 3, nombre: "Juan Torres", rol: "Cliente", email: "juan@gamesearch.com" },
  ];

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="usuarios-main">
        {/* Encabezado */}
        <header className="usuarios-header">
          <h1>Gestión de Usuarios</h1>
        </header>

        {/* Botón NUEVO USUARIO fuera del recuadro */}
        <div className="nuevo-usuario-container">
          <Link to="/admin/usuarios/crear" className="btn-nuevo-usuario">
            + Nuevo Usuario
          </Link>
        </div>

        {/* Recuadro / lista de usuarios */}
        <section className="usuarios-tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.rol}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link to={`/admin/usuarios/ver/${u.id}`} className="btn-secondary">
                      Ver
                    </Link>
                    <Link to={`/admin/usuarios/editar/${u.id}`} className="btn-warning">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
