import { useEffect } from "react";

export default function useValidacionesCrearProducto() {
  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;

    // Expresiones regulares
    const expresiones = {
      nombre: /^[a-zA-Z0-9\s\-\_]{4,40}$/,    // letras, números, espacios, guiones
      categoria: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,  // letras, números, acentos, espacios
      precio: /^\d+(\.\d{1,2})?$/,            // número con 2 decimales opcionales
      stock: /^\d{1,14}$/                     // hasta 14 dígitos
    };

    // Estado de campos (creación requiere que TODOS sean válidos)
    const campos = {
      nombre: false,
      categoria: false,
      precio: false,
      stock: false
    };

    const marcarBorde = (input, valido) => {
      if (!input) return;
      input.style.border = valido ? "2px solid green" : "2px solid red";
    };

    const validarCampo = (expresion, input, campo) => {
      const error = document.getElementById(`error-${campo}`);
      const value = input.value === undefined ? "" : String(input.value).trim();
      let valido = expresion.test(value);

      if (valido) {
        if (campo === "precio") {
          const num = parseFloat(value);
          if (Number.isNaN(num) || num < 0) {
            valido = false;
            if (error) error.textContent = "⚠️ No se permiten números negativos";
          } else {
            if (error) error.textContent = "";
          }
        } else if (campo === "stock") {
          const num = parseInt(value, 10);
          if (Number.isNaN(num) || num < 0) {
            valido = false;
            if (error) error.textContent = "⚠️ No se permiten números negativos";
          } else {
            if (error) error.textContent = "";
          }
        } else {
          if (error) error.textContent = "";
        }
      } else {
        switch (campo) {
          case "nombre":
            if (error) error.textContent = "El nombre debe tener entre 4 y 40 caracteres.";
            break;
          case "categoria":
            if (error) error.textContent = "La categoría debe tener letras, números y espacios (3-40 caracteres).";
            break;
          case "precio":
            if (error) error.textContent = "Ingrese un precio válido (ej: 199.99) y no negativo.";
            break;
          case "stock":
            if (error) error.textContent = "El stock debe ser un número válido y no negativo.";
            break;
          default:
            if (error) error.textContent = "";
        }
      }

      campos[campo] = valido;
      marcarBorde(input, valido);
    };

    const validarFormulario = (e) => {
      const target = e.target;
      if (!target) return;
      switch (target.id) {
        case "nombre":
          validarCampo(expresiones.nombre, target, "nombre");
          break;
        case "categoria":
          validarCampo(expresiones.categoria, target, "categoria");
          break;
        case "precio":
          validarCampo(expresiones.precio, target, "precio");
          break;
        case "stock":
          validarCampo(expresiones.stock, target, "stock");
          break;
        default:
          break;
      }
    };

    // Inputs dentro del formulario
    const inputs = Array.from(form.querySelectorAll("input"));

    // Handlers para poder removerlos en cleanup
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
      // Validar todos los campos una última vez antes de decidir
      inputs.forEach((input) => {
        const id = input.id;
        if (id && expresiones[id]) validarCampo(expresiones[id], input, id);
      });

      const todoValido = Object.values(campos).every(Boolean);
      if (todoValido) {
        alert("✅ Producto creado correctamente");
        form.reset();
        inputs.forEach((input) => (input.style.border = ""));
        Object.keys(campos).forEach((k) => (campos[k] = false));
        // NOTA: Si quieres enviar el formulario realmente, quita el preventDefault arriba y aquí puedes permitir submit.
      } else {
        alert("⚠️ Por favor completa correctamente todos los campos.");
      }
    };

    form.addEventListener("submit", submitHandler);

    return () => {
      // Cleanup: remover listeners
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