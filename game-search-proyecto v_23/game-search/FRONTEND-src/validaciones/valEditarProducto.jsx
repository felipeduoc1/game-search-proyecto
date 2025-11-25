import { useEffect } from "react";

export default function useValidacionesEditarProducto() {
  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;

    const expresiones = {
      nombre: /^[a-zA-Z0-9\s\-\_]{4,40}$/,
      categoria: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,
      precio: /^\d+(\.\d{1,2})?$/,
      stock: /^\d{1,14}$/
    };

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
      const raw = input.value === undefined ? "" : String(input.value).trim();

      // If field is empty (no change), mark as false but clear errors/borders
      if (raw === "") {
        campos[campo] = false;
        if (error) error.textContent = "";
        input.style.border = "";
        return;
      }

      let valido = expresion.test(raw);

      if (valido) {
        if (campo === "precio") {
          const num = parseFloat(raw);
          if (Number.isNaN(num) || num < 0) {
            valido = false;
            if (error) error.textContent = "⚠️ No se permiten números negativos";
          } else {
            if (error) error.textContent = "";
          }
        } else if (campo === "stock") {
          const num = parseInt(raw, 10);
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

    const inputs = Array.from(form.querySelectorAll("input"));

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

      // Validar sólo los campos que tengan contenido (edición)
      inputs.forEach((input) => {
        const id = input.id;
        const val = input.value === undefined ? "" : String(input.value).trim();
        if (id && expresiones[id]) {
          if (val !== "") validarCampo(expresiones[id], input, id);
          else {
            // limpiar estado si vacio
            campos[id] = false;
            const err = document.getElementById(`error-${id}`);
            if (err) err.textContent = "";
            input.style.border = "";
          }
        }
      });

      // Si no hay campos modificados
      const anyFilled = inputs.some((input) => {
        const v = input.value === undefined ? "" : String(input.value).trim();
        return v !== "";
      });
      if (!anyFilled) {
        alert("⚠️ Modifica al menos un campo para editar el producto.");
        return;
      }

      // Verificar que los campos llenos sean válidos
      const anyValidFilled = inputs.some((input) => {
        const v = input.value === undefined ? "" : String(input.value).trim();
        return v !== "" && campos[input.id];
      });

      const anyInvalidFilled = inputs.some((input) => {
        const v = input.value === undefined ? "" : String(input.value).trim();
        return v !== "" && !campos[input.id];
      });

      if (anyInvalidFilled) {
        alert("⚠️ Por favor corrige los campos inválidos antes de guardar.");
        return;
      }

      if (anyValidFilled) {
        alert("✅ Producto editado correctamente");
        form.reset();
        inputs.forEach((input) => (input.style.border = ""));
        Object.keys(campos).forEach((k) => (campos[k] = false));
        // Si quieres enviar realmente el formulario, remueve e.preventDefault() arriba y maneja envío.
      } else {
        alert("⚠️ Por favor completa correctamente el campo.");
      }
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