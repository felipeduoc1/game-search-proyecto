// validaciones_Registro.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.querySelector(".register-form");

  // Expresiones regulares según reglas de negocio
  const regex = {
    run: /^[0-9]{7,8}[0-9kK]{1}$/, // RUN sin puntos ni guion (ej: 19011022K)
    nombre: /^.{1,50}$/,
    apellidos: /^.{1,100}$/,
    correo: /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/,
    password: /^.{4,10}$/,
    telefono: /^[0-9]{9,15}$/
  };

  // Función para mostrar error
  const mostrarError = (input, mensaje) => {
    let error = input.parentElement.querySelector(".error");
    if (!error) {
      error = document.createElement("p");
      error.classList.add("error");
      input.parentElement.appendChild(error);
    }
    error.textContent = mensaje;
    input.classList.add("input-error");
    input.classList.remove("input-ok");
  };

  // Función para limpiar error
  const limpiarError = (input) => {
    const error = input.parentElement.querySelector(".error");
    if (error) error.textContent = "";
    input.classList.remove("input-error");
    input.classList.add("input-ok");
  };

  // Validar Dígito Verificador del RUN
  const validarDV = (run) => {
    const cuerpo = run.slice(0, -1);
    let dv = run.slice(-1).toUpperCase();

    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo.charAt(i), 10);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvFinal = (dvEsperado === 11) ? "0" : (dvEsperado === 10 ? "K" : dvEsperado.toString());

    return dv === dvFinal;
  };

  // Validaciones individuales
  const validarCampo = (input) => {
    const valor = input.value.trim();
    const id = input.id;

    switch (id) {
      // LOGIN
      case "login-email":
        if (!valor) mostrarError(input, "El correo es obligatorio");
        else if (valor.length > 100) mostrarError(input, "Máx. 100 caracteres");
        else if (!regex.correo.test(valor)) mostrarError(input, "Correo no válido");
        else limpiarError(input);
        break;

      case "login-pass":
        if (!valor) mostrarError(input, "La contraseña es obligatoria");
        else if (!regex.password.test(valor)) mostrarError(input, "Debe tener entre 4 y 10 caracteres");
        else limpiarError(input);
        break;

      // REGISTRO
      case "reg-run":
        if (!valor) mostrarError(input, "El RUN es obligatorio");
        else if (!regex.run.test(valor)) mostrarError(input, "Formato inválido. Ej: 19011022K");
        else if (!validarDV(valor)) mostrarError(input, "RUN no válido (DV incorrecto)");
        else limpiarError(input);
        break;

      case "reg-nombre":
        if (!valor) mostrarError(input, "El nombre es obligatorio");
        else if (!regex.nombre.test(valor)) mostrarError(input, "Máx. 50 caracteres");
        else limpiarError(input);
        break;

      case "reg-email":
        if (!valor) mostrarError(input, "El correo es obligatorio");
        else if (valor.length > 100) mostrarError(input, "Máx. 100 caracteres");
        else if (!regex.correo.test(valor)) mostrarError(input, "Correo no válido (solo @duocuc.cl, @profesor.duocuc.cl o @gmail.com)");
        else limpiarError(input);
        break;

      case "reg-pass":
        if (!valor) mostrarError(input, "La contraseña es obligatoria");
        else if (!regex.password.test(valor)) mostrarError(input, "Debe tener entre 4 y 10 caracteres");
        else limpiarError(input);
        break;

      case "reg-pass-confirm":
        const pass = document.getElementById("reg-pass").value.trim();
        if (valor !== pass) mostrarError(input, "Las contraseñas no coinciden");
        else limpiarError(input);
        break;

      case "reg-telefono":
        if (valor && !regex.telefono.test(valor)) mostrarError(input, "Teléfono no válido (9-15 dígitos)");
        else limpiarError(input);
        break;

      case "reg-fecha-nac":
        if (!valor) mostrarError(input, "La fecha es obligatoria");
        else limpiarError(input);
        break;

      case "pais":
        if (!valor) mostrarError(input, "Seleccione un país");
        else limpiarError(input);
        break;

      case "ciudad":
        if (!valor) mostrarError(input, "Seleccione una ciudad");
        else limpiarError(input);
        break;
    }
  };

  // Eventos en todos los inputs
  const allInputs = document.querySelectorAll("input, select, textarea");
  allInputs.forEach((input) => {
    input.addEventListener("blur", () => validarCampo(input));
    input.addEventListener("keyup", () => validarCampo(input));
    input.addEventListener("change", () => validarCampo(input));
  });

  // Validar login al enviar
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    ["login-email", "login-pass", "rol"].forEach((id) => {
      const input = document.getElementById(id);
      validarCampo(input);
      if (input.classList.contains("input-error")) valido = false;
    });
    if (valido) alert("✅ Inicio de sesión correcto");
  });

  // Validar registro al enviar
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    ["reg-run", "reg-nombre", "reg-email", "reg-pass", "reg-pass-confirm", "reg-fecha-nac", "pais", "ciudad"].forEach((id) => {
      const input = document.getElementById(id);
      validarCampo(input);
      if (input.classList.contains("input-error")) valido = false;
    });
    if (valido) alert("✅ Registro correcto");
  });
});
