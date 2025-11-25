import { renderHook } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import useValidacionesIniRegUsuario from "../validaciones/valCrearUsuarios.jsx";

describe("Hook: useValidacionesIniRegUsuario", () => {
  // Crear un DOM virtual para las pruebas
  beforeEach(() => {
    document.body.innerHTML = `
      <form class="register-form">
        <input id="reg-nombre" />
        <div id="error-nombre"></div>
        <input id="reg-run" />
        <div id="error-run"></div>
        <input id="reg-email" />
        <div id="error-correo"></div>
        <input id="reg-pass" type="password" />
        <div id="error-password"></div>
        <input id="reg-pass-confirm" type="password" />
        <div id="error-password-confirm"></div>
        <input id="reg-telefono" />
        <div id="error-telefono"></div>
      </form>
    `;
  });

  // Limpiar el DOM después de cada prueba
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("debería validar un nombre correcto", () => {
    const { result } = renderHook(() => useValidacionesIniRegUsuario());
    const nombreInput = document.getElementById("reg-nombre");
    const errorNombre = document.getElementById("error-nombre");

    nombreInput.value = "Nombre Válido";
    nombreInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorNombre.textContent).toBe("");
    expect(nombreInput.style.borderColor).toBe("rgb(76, 175, 80)"); // #4caf50
  });

  it("debería mostrar error para un nombre inválido (muy corto)", () => {
    renderHook(() => useValidacionesIniRegUsuario());
    const nombreInput = document.getElementById("reg-nombre");
    const errorNombre = document.getElementById("error-nombre");

    nombreInput.value = "Ana"; // Menos de 4 caracteres
    nombreInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorNombre.textContent).toBe("nombre inválido");
    expect(nombreInput.style.borderColor).toBe("rgb(255, 107, 107)"); // #ff6b6b
  });

  it("debería validar un email correcto", () => {
    renderHook(() => useValidacionesIniRegUsuario());
    const emailInput = document.getElementById("reg-email");
    const errorEmail = document.getElementById("error-correo");

    emailInput.value = "test@example.com";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorEmail.textContent).toBe("");
    expect(emailInput.style.borderColor).toBe("rgb(76, 175, 80)");
  });

  it("debería mostrar error para un email inválido", () => {
    renderHook(() => useValidacionesIniRegUsuario());
    const emailInput = document.getElementById("reg-email");
    const errorEmail = document.getElementById("error-correo");

    emailInput.value = "test@invalid";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorEmail.textContent).toBe("email inválido");
    expect(emailInput.style.borderColor).toBe("rgb(255, 107, 107)");
  });

  it("debería mostrar error si las contraseñas no coinciden", () => {
    renderHook(() => useValidacionesIniRegUsuario());
    const passInput = document.getElementById("reg-pass");
    const confirmPassInput = document.getElementById("reg-pass-confirm");
    const errorConfirm = document.getElementById("error-password-confirm");

    passInput.value = "password123";
    passInput.dispatchEvent(new Event("input", { bubbles: true }));

    confirmPassInput.value = "password456";
    confirmPassInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorConfirm.textContent).toBe("Las contraseñas no coinciden");
    expect(confirmPassInput.style.borderColor).toBe("rgb(255, 107, 107)");
  });

  it("debería validar si las contraseñas coinciden", () => {
    renderHook(() => useValidacionesIniRegUsuario());
    const passInput = document.getElementById("reg-pass");
    const confirmPassInput = document.getElementById("reg-pass-confirm");
    const errorConfirm = document.getElementById("error-password-confirm");

    passInput.value = "password123";
    passInput.dispatchEvent(new Event("input", { bubbles: true }));

    confirmPassInput.value = "password123";
    confirmPassInput.dispatchEvent(new Event("input", { bubbles: true }));

    expect(errorConfirm.textContent).toBe("");
    expect(confirmPassInput.style.borderColor).toBe("rgb(76, 175, 80)");
  });
});
