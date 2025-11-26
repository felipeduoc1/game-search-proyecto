import { useEffect } from "react";

export default function useValidacionesInicioSesion() {
  useEffect(() => {
    const expresiones = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^.{6,20}$/
    };

    const marcarError = (input, error, mensaje = "", valido = false) => {
      if (!input || !error) return;
      if (valido) {
        error.textContent = "";
        error.style.display = "none";
        if (input.style) input.style.borderColor = "#4caf50";
      } else {
        error.textContent = mensaje;
        error.style.display = "block";
        error.style.color = "#ff6b6b";
        if (input.style) input.style.borderColor = "#ff6b6b";
      }
    };

    const loginEmail = document.getElementById("login-email");
    const loginPass = document.getElementById("login-pass");
    const loginRol = document.getElementById("rol");

    const validateLogin = () => {
      if (!loginEmail || !loginPass || !loginRol) return false;

      const loginValid = {
        email: expresiones.email.test(loginEmail.value),
        password: expresiones.password.test(loginPass.value),
        rol: loginRol.value !== ""
      };

      marcarError(
        loginEmail,
        document.getElementById("error-login-email"),
        "Email inválido",
        loginValid.email
      );

      marcarError(
        loginPass,
        document.getElementById("error-login-pass"),
        "Contraseña debe tener entre 6 y 20 caracteres",
        loginValid.password
      );

      marcarError(
        loginRol,
        document.getElementById("error-rol"),
        "Seleccione un rol",
        loginValid.rol
      );

      return Object.values(loginValid).every(Boolean);
    };

    // validación en tiempo real por carácter / cambio
    const onLoginInput = () => validateLogin();

    if (loginEmail) loginEmail.addEventListener("input", onLoginInput);
    if (loginPass) loginPass.addEventListener("input", onLoginInput);
    if (loginRol) loginRol.addEventListener("change", onLoginInput);

    return () => {
      if (loginEmail) loginEmail.removeEventListener("input", onLoginInput);
      if (loginPass) loginPass.removeEventListener("input", onLoginInput);
      if (loginRol) loginRol.removeEventListener("change", onLoginInput);
    };
  }, []);
}