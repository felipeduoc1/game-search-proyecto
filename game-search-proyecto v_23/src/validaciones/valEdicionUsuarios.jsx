import { useEffect } from "react";

export default function useValidacionesEdicionUsuarios() {
  useEffect(() => {
    const form = document.querySelector(".formulario");
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll("input"));

    const expresiones = {
      nombre: /^[a-zA-Z0-9\s\-\_áéíóúÁÉÍÓÚüÜ]{4,40}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };

    const campos = {
      nombre: false,
      email: false
    };

    const marcarBorde = (input, valido) => {
      if (!input) return;
      input.style.border = valido ? "2px solid green" : "2px solid red";
    };

    const validarCampo = (expresion, input, campo) => {
      const error = document.getElementById(`error-${campo}`);
      const raw = input.value === undefined ? "" : String(input.value).trim();

      // Si el campo está vacío (no se modifica), limpiamos estado y no lo consideramos inválido
      if (raw === "") {
        campos[campo] = false;
        if (error) error.textContent = "";
        input.style.border = "";
        return;
      }

      if (expresion.test(raw)) {
        if (error) error.textContent = "";
        campos[campo] = true;
        marcarBorde(input, true);
      } else {
        if (error) {
          if (campo === "nombre") error.textContent = "El nombre debe tener entre 4 y 40 caracteres.";
          if (campo === "email") error.textContent = "Correo electrónico inválido.";
        }
        campos[campo] = false;
        marcarBorde(input, false);
      }
    };

    const validarFormulario = (e) => {
      const target = e.target;
      if (!target) return;
      switch (target.id) {
        case "nombre":
          validarCampo(expresiones.nombre, target, "nombre");
          break;
        case "email":
          validarCampo(expresiones.email, target, "email");
          break;
        default:
          break;
      }
    };

    const handlers = new Map();
    inputs.forEach((input) => {
      const keyUpHandler = (e) => validarFormulario(e);
      const blurHandler = (e) => validarFormulario(e);
      input.addEventListener("keyup", keyUpHandler);
      input.addEventListener("blur", blurHandler);
      handlers.set(input, { keyUpHandler, blurHandler });
    });

    const submitHandler = (e) => {
      e.preventDefault();

      // Validar sólo inputs que tienen contenido
      inputs.forEach((input) => {
        const id = input.id;
        const val = input.value === undefined ? "" : String(input.value).trim();
        if (id && expresiones[id] && val !== "") {
          validarCampo(expresiones[id], input, id);
        } else if (id && expresiones[id] && val === "") {
          campos[id] = false;
          const err = document.getElementById(`error-${id}`);
          if (err) err.textContent = "";
          input.style.border = "";
        }
      });

      const anyFilled = inputs.some((input) => {
        const v = input.value === undefined ? "" : String(input.value).trim();
        return v !== "";
      });

      if (!anyFilled) {
        alert("⚠️ Modifica al menos un campo para editar el usuario.");
        return;
      }

      const anyInvalidFilled = inputs.some((input) => {
        const v = input.value === undefined ? "" : String(input.value).trim();
        return v !== "" && !campos[input.id];
      });

      if (anyInvalidFilled) {
        alert("⚠️ Por favor corrige los campos inválidos antes de guardar.");
        return;
      }

      // Si llegamos aquí, hay al menos un campo modificado y todos los modificados son válidos
      alert("✅ Usuario actualizado correctamente");
      form.reset();
      inputs.forEach((input) => (input.style.border = ""));
      Object.keys(campos).forEach((k) => (campos[k] = false));
      // Si quieres enviar el formulario realmente, quita e.preventDefault() arriba y maneja el envío.
    };

    form.addEventListener("submit", submitHandler);

    return () => {
      inputs.forEach((input) => {
        const h = handlers.get(input);
        if (h) {
          input.removeEventListener("keyup", h.keyUpHandler);
          input.removeEventListener("blur", h.blurHandler);
        }
      });
      form.removeEventListener("submit", submitHandler);
    };
  }, []);
}