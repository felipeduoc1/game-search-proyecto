import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/ini_reg_usuario.css';
import Header from "../../components/Header";
import useValidacionesInicioSesion from "../../validaciones/valInicioSesion";
import useValidacionesIniRegUsuario from "../../validaciones/valCrearUsuarios";

const IniRegUsuario = () => {
  const navigate = useNavigate();

  // hooks separados: login y registro (solo validaciones en tiempo real)
  useValidacionesInicioSesion();
  useValidacionesIniRegUsuario();

  // 🔹 Manejo de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-pass").value.trim();
    const rol = document.getElementById("rol").value;

    if (!email || !pass || !rol) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const user = { email, rol, nombre: email.split("@")[0] };
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userLoggedIn"));

    if (rol === "admin") navigate("/admin");
    else if (rol === "vendedor") navigate("/vendedor");
    else navigate("/productos");
  };

  // 🔹 Acceso rápido (nuevo para Cliente, y ya estaban Admin y Vendedor)
  const handleQuickAccess = (rol) => {
    let destino = "/";
    if (rol === "cliente") destino = "/productos";
    if (rol === "vendedor") destino = "/vendedor";
    if (rol === "admin") destino = "/admin";

    const user = { email: `${rol}@gamesearch.com`, rol, nombre: rol };
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userLoggedIn"));
    navigate(destino);
  };

  // 🔹 Manejo de registro (solo simulado)
  const handleRegister = (e) => {
    e.preventDefault();

    const nombre = document.getElementById("reg-nombre").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-pass").value;
    const confirm = document.getElementById("reg-pass-confirm").value;

    if (!nombre || !email || !pass || !confirm) {
      alert("Complete todos los campos requeridos.");
      return;
    }

    if (pass !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("Usuario registrado correctamente (simulado)");
  };

  return (
    <>
      <Header />

      <main>
        <div className="auth-container">
          {/* Formulario de inicio de sesión */}
          <div className="login-container">
            <form id="login-form" className="login" onSubmit={handleLogin}>
              <h2>Iniciar Sesión</h2>

              {/* 🔹 Botones de acceso rápido */}
              <div className="quick-access-buttons">
                <button
                  type="button"
                  onClick={() => handleQuickAccess("cliente")}
                  className="btn-cliente"
                >
                  Entrar como Cliente
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAccess("vendedor")}
                  className="btn-vendedor"
                >
                  Entrar como Vendedor
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAccess("admin")}
                  className="btn-admin"
                >
                  Entrar como Administrador
                </button>
              </div>

              <div className="email">
                <label htmlFor="login-email">Correo:</label>
                <div className="email">
                  <input
                    type="email"
                    className="login__form-input"
                    id="login-email"
                    name="login-email"
                    required
                  />
                </div>
                <p className="error" id="error-login-email"></p>
              </div>

              <div className="password">
                <label htmlFor="login-pass">Contraseña:</label>
                <div className="password">
                  <input
                    type="password"
                    className="login__form-input"
                    id="login-pass"
                    name="login-pass"
                    required
                  />
                </div>
                <p className="error" id="error-login-pass"></p>
              </div>

              {/* Selector de rol */}
              <div className="rol">
                <label htmlFor="rol">Acceder como:</label>
                <select id="rol" name="rol" required>
                  <option value="">-- Selecciona --</option>
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
                <p className="error" id="error-rol"></p>
              </div>

              <button type="submit">Entrar</button>
            </form>
          </div>

          {/* Formulario de registro */}
          <form className="register-form" onSubmit={handleRegister}>
            <h2>Registro de usuario</h2>

            <div className="nombre">
              <label htmlFor="reg-nombre">Nombre completo:</label>
              <div className="formulario__grupo-input">
                <input
                  type="text"
                  className="register__form-input"
                  id="reg-nombre"
                  name="reg-nombre"
                  required
                />
              </div>
              <p className="error" id="error-nombre"></p>
            </div>

            <div className="reg-run">
              <label htmlFor="reg-run">RUN:</label>
              <input
                type="text"
                id="reg-run"
                name="reg-run"
                required
                placeholder="Ej: 19011022K"
              />
              <p className="error" id="error-run"></p>
            </div>

            <div className="reg-email">
              <label htmlFor="reg-email">Correo:</label>
              <div className="formulario__grupo-input">
                <input
                  type="email"
                  className="register__form-input"
                  id="reg-email"
                  name="reg-email"
                  required
                />
              </div>
              <p className="error" id="error-correo"></p>
            </div>

            <label htmlFor="reg-pass">Contraseña:</label>
            <div className="formulario__grupo-input">
              <input
                type="password"
                className="register__form-input"
                id="reg-pass"
                name="reg-pass"
                required
              />
            </div>
            <p className="error" id="error-password"></p>

            <label htmlFor="reg-pass-confirm">Confirmar contraseña:</label>
            <div className="formulario__grupo-input">
              <input
                type="password"
                className="register__form-input"
                id="reg-pass-confirm"
                name="reg-pass-confirm"
                required
              />
            </div>
            <p className="error" id="error-password-confirm"></p>

            <label htmlFor="reg-telefono">Teléfono (opcional):</label>
            <input type="tel" id="reg-telefono" name="reg-telefono" />
            <p className="error" id="error-telefono"></p>

            <div className="reg-fecha-nac">
              <label htmlFor="reg-fecha-nac">Fecha de nacimiento:</label>
              <div>
                <input
                  type="date"
                  className="register__form-input"
                  id="reg-fecha-nac"
                  name="reg-fecha-nac"
                  required
                />
              </div>
              <p className="error" id="error-fecha-nac"></p>
            </div>

            <label htmlFor="pais">País:</label>
            <select name="pais" id="pais" required>
              <option value="">-- Seleccione el país --</option>
              <option value="chile">Chile</option>
              <option value="argentina">Argentina</option>
              <option value="mexico">México</option>
              <option value="espana">España</option>
            </select>
            <p className="error" id="error-pais"></p>

            <label htmlFor="ciudad">Ciudad:</label>
            <select name="ciudad" id="ciudad" required>
              <option value="">-- Seleccione la ciudad --</option>
              <option value="santiago">Santiago</option>
              <option value="buenosaires">Buenos Aires</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="madrid">Madrid</option>
            </select>
            <p className="error" id="error-ciudad"></p>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default IniRegUsuario;
