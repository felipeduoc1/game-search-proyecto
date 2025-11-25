import { useEffect } from "react";

export default function useValidacionesIniRegUsuario() {
  useEffect(() => {
    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{4,50}$/,
      run: /^[0-9]{7,8}[0-9kK]{1}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^.{6,20}$/,
      telefono: /^\+?56?\d{9}$/
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

    const registerForm = document.querySelector(".register-form");
    if (!registerForm) return;

    const nombreInput = document.getElementById("reg-nombre");
    const runInput = document.getElementById("reg-run");
    const emailInput = document.getElementById("reg-email");
    const pass = document.getElementById("reg-pass");
    const confirmPass = document.getElementById("reg-pass-confirm");
    const telefono = document.getElementById("reg-telefono");
    const pais = document.getElementById("pais");
    const ciudad = document.getElementById("ciudad");
    const fechaNac = document.getElementById("reg-fecha-nac");

    const validarCampo = (input, tipo, errorId) => {
      if (!input) return false;
      const valor = input.value.trim();
      let esValido = false;

      if (tipo === "telefono") {
        esValido = valor === "" ? true : expresiones.telefono.test(valor);
      } else {
        esValido = expresiones[tipo] ? expresiones[tipo].test(valor) : valor !== "";
      }

      const error = document.getElementById(errorId);
      marcarError(input, error, `${tipo} inválido`, esValido);
      return esValido;
    };

    const onNombreInput = () => validarCampo(nombreInput, "nombre", "error-nombre");
    const onRunInput = () => validarCampo(runInput, "run", "error-run");
    const onEmailInput = () => validarCampo(emailInput, "email", "error-correo");
    const onTelefonoInput = () => validarCampo(telefono, "telefono", "error-telefono");
    const onPaisChange = () => {
      if (!pais) return;
      const valido = pais.value !== "";
      marcarError(pais, document.getElementById("error-pais"), "Seleccione un país", valido);
    };
    const onCiudadChange = () => {
      if (!ciudad) return;
      const valido = ciudad.value !== "";
      marcarError(ciudad, document.getElementById("error-ciudad"), "Seleccione una ciudad", valido);
    };
    const onFechaNacChange = () => {
      if (!fechaNac) return;
      const valido = fechaNac.value !== "";
      marcarError(fechaNac, document.getElementById("error-fecha-nac"), "Seleccione fecha de nacimiento", valido);
    };

    const onPasswordInput = () => {
      if (!pass) return;
      const passValido = expresiones.password.test(pass.value);
      marcarError(pass, document.getElementById("error-password"), "Contraseña debe tener entre 6 y 20 caracteres", passValido);

      if (confirmPass) {
        const confirmValido = pass.value === confirmPass.value;
        marcarError(confirmPass, document.getElementById("error-password-confirm"), "Las contraseñas no coinciden", confirmValido);
      }
    };

    const onConfirmPasswordInput = () => {
      if (!pass || !confirmPass) return;
      const confirmValido = pass.value === confirmPass.value;
      marcarError(confirmPass, document.getElementById("error-password-confirm"), "Las contraseñas no coinciden", confirmValido);
    };

    if (nombreInput) nombreInput.addEventListener("input", onNombreInput);
    if (runInput) runInput.addEventListener("input", onRunInput);
    if (emailInput) emailInput.addEventListener("input", onEmailInput);
    if (telefono) telefono.addEventListener("input", onTelefonoInput);
    if (pais) pais.addEventListener("change", onPaisChange);
    if (ciudad) ciudad.addEventListener("change", onCiudadChange);
    if (fechaNac) fechaNac.addEventListener("change", onFechaNacChange);
    if (pass) pass.addEventListener("input", onPasswordInput);
    if (confirmPass) confirmPass.addEventListener("input", onConfirmPasswordInput);

    return () => {
      if (nombreInput) nombreInput.removeEventListener("input", onNombreInput);
      if (runInput) runInput.removeEventListener("input", onRunInput);
      if (emailInput) emailInput.removeEventListener("input", onEmailInput);
      if (telefono) telefono.removeEventListener("input", onTelefonoInput);
      if (pais) pais.removeEventListener("change", onPaisChange);
      if (ciudad) ciudad.removeEventListener("change", onCiudadChange);
      if (fechaNac) fechaNac.removeEventListener("change", onFechaNacChange);
      if (pass) pass.removeEventListener("input", onPasswordInput);
      if (confirmPass) confirmPass.removeEventListener("input", onConfirmPasswordInput);
    };
  }, []);
}