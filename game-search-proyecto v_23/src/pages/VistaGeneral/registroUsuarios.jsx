import React from "react";
import { Link } from "react-router-dom";
import "../../styles/registroUsuarios.css";
import useValidacionesCrearUsuario from "../../validaciones/valCrearUsuarios";

const RegistroUsuarios = () => {
  useValidacionesCrearUsuario();

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2>GameSearch</h2>
          <div className="menu">
            <a href="pPrincipalAdmin.html" className="active">inicio</a>
            <a href="productosAdmin.html">🎮 Productos</a>
            <a href="usuarios.html">👨‍💼 Empleados</a>
          </div>
        </div>
        <div className="footer">
          <a href="#">👤 Perfil</a>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="main">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          
          <form className="formulario" id="formulario">
            <div className="row">
              <div>
                <label htmlFor="run">RUN *</label>
                <input type="text" id="run" placeholder="12345678-9" />
                <p className="error" id="error-run"></p>
              </div>
              
              <div>
                <label htmlFor="nombre">Nombre Completo *</label>
                <input type="text" id="nombre" placeholder="Juan Pérez" />
                <p className="error" id="error-nombre"></p>
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="correo">Correo Electrónico *</label>
                <input type="email" id="correo" placeholder="correo@ejemplo.com" />
                <p className="error" id="error-correo"></p>
              </div>
              
              <div>
                <label htmlFor="telefono">Teléfono (opcional)</label>
                <input type="tel" id="telefono" placeholder="+56912345678" />
                <p className="error" id="error-telefono"></p>
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="usuario">Nombre de Usuario *</label>
                <input type="text" id="usuario" placeholder="usuario123" />
                <p className="error" id="error-usuario"></p>
              </div>
              
              <div>
                <label htmlFor="tipoUsuario">Tipo de Usuario *</label>
                <select name="tipoUsuario" id="tipoUsuario">
                  <option value="">Seleccione...</option>
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="region">Región *</label>
                <select name="region" id="region">
                  <option value="">-- Seleccione la región --</option>
                  <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                  <option value="Región de Los Ángeles">Región de Los Ángeles</option>
                  <option value="Región de Ñuble">Región de Ñuble</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="comuna">Comuna *</label>
                <select name="comuna" id="comuna">
                  <option value="">-- Seleccione la comuna --</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div>
                <label htmlFor="password">Contraseña *</label>
                <input type="password" id="password" />
                <p className="error" id="error-password"></p>
              </div>
              
              <div>
                <label htmlFor="confirmar">Confirmar Contraseña *</label>
                <input type="password" id="confirmar" />
                <p className="error" id="error-confirmar"></p>
              </div>
            </div>

            <div className="row buttons">
              <button type="submit" className="btn-primary">
                Registrar Usuario
              </button>
              <Link to="/" className="btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistroUsuarios;
