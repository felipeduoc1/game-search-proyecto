import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { Link } from "react-router-dom"; // Agregar esta importación
import "../../styles/editarUsuarios.css";
import useValidacionesEdicionUsuarios from "../../validaciones/valEdicionUsuarios";

const editarUsuarios = () => {
  useValidacionesEdicionUsuarios();

  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header>
          <h1>Editar Usuario</h1>
        </header>

        <form className="formulario">
          <div id="formulario_nombre" className="nombre">
            <label htmlFor="nombre">Nombre</label>
            <div className="formulario__grupo-input">
              <input type="text" id="nombre" defaultValue="Carlos Pérez" />
            </div>
            <p className="error" id="error-nombre"></p>
          </div>

          <label htmlFor="rol">Rol</label>
          <select id="rol" defaultValue="Administrador">
            <option>Administrador</option>
            <option>Vendedor</option>
            <option>Cliente</option>
          </select>

          <div id="formulario_nombre" className="nombre">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="formulario__grupo-input">
              <input
                type="email"
                id="email"
                defaultValue="carlos@gamesearch.com"
              />
            </div>
            <p className="error" id="error-email"></p>
          </div>

          <label htmlFor="estado">Estado</label>
          <select id="estado" defaultValue="Activo">
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button type="submit" className="btn-primary">
            Guardar Cambios
          </button>
          <Link to="/admin/usuarios" className="btn-secondary">
            Cancelar
          </Link>
        </form>
      </main>
    </div>
  );
};

export default editarUsuarios;
