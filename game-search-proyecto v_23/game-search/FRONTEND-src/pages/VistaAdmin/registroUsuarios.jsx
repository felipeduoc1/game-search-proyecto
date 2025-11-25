import React from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import "../../styles/registroUsuarios.css";

const registroUsuarios = () => {
  return (
    <div className="page-container">
      <SidebarAdmin />

      <main className="main-content">
        <header>
          <h1>Registrar Nuevo Usuario</h1>
        </header>

        <form action="" className="formulario" id="formulario">
          {/* Nombre */}
          <div id="formulario_nombre" className="form-grupo">
            <label htmlFor="nombre">Nombre completo</label>
            <div className="formulario__grupo-input">
              <input
                type="text"
                className="formulario__input"
                id="nombre"
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>
            <p className="error" id="error-nombre"></p>
          </div>

          {/* Email */}
          <div id="formulario_email" className="form-grupo">
            <label htmlFor="email">Correo electrónico</label>
            <div className="formulario__grupo-input">
              <input
                type="email"
                className="formulario__input"
                id="email"
                placeholder="Ej: usuario@gamesearch.com"
                required
              />
            </div>
            <p className="error" id="error-email"></p>
          </div>

          {/* Contraseña */}
          <div id="formulario_password" className="form-grupo">
            <label htmlFor="password">Contraseña</label>
            <div className="formulario__grupo-input">
              <input
                type="password"
                className="formulario__input"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <p className="error" id="error-password"></p>
          </div>

          {/* Rol */}
          <div id="formulario_rol" className="form-grupo">
            <label htmlFor="rol">Rol</label>
            <div className="formulario__grupo-input">
              <select id="rol" className="formulario__input" required>
                <option value="">Seleccione un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
            <p className="error" id="error-rol"></p>
          </div>

          {/* Botones */}
          <div id="submit" className="submit">
            <button type="submit" className="btn-primary">
              Guardar Usuario
            </button>
            <Link to="/admin/usuarios" className="btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default registroUsuarios;
