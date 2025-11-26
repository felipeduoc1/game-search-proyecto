import React, { createContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header"; // ← CAMBIÉ LA RUTA

const mockCartContext = {
  // Este mock no es usado por Header, pero lo mantenemos por si acaso.
  getTotalItems: () => 3
};

// Mock del CartContext
const CartContext = createContext();

const renderWithRouterAndContext = (component) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        {component}
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe("Componente Header", () => {
  beforeEach(() => {
    // Limpiamos el localStorage antes de cada prueba
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renderiza el logo y navegación correctamente", () => {
    renderWithRouterAndContext(<Header />);

    expect(screen.getByRole("link", { name: /Game Search/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /productos/i })).toBeInTheDocument();
    // Verificamos que el texto "Carrito" y el botón estén presentes
    expect(screen.getByText(/Carrito/i)).toBeInTheDocument(); // El texto al lado del botón
    expect(screen.getByRole("button", { name: /🛒/i })).toBeInTheDocument(); // El botón con el emoji
  });

  it("contiene enlaces de navegación funcionales", () => {
    renderWithRouterAndContext(<Header />);

    const productosLink = screen.getByRole("link", { name: /productos/i });
    expect(productosLink).toHaveAttribute("href", "/productos"); // Esta prueba ya estaba bien
  });

  it("muestra la cantidad de items en el carrito desde localStorage", () => {
    // Simulamos que hay 3 items en el carrito en localStorage
    const mockCart = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }];
    localStorage.setItem('cart', JSON.stringify(mockCart));

    renderWithRouterAndContext(<Header />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("aplica clases CSS correctamente", () => {
    const { container } = renderWithRouterAndContext(<Header />);

    const headerElement = container.querySelector('.site-header');
    expect(headerElement).toHaveClass("site-header");

    const logoElement = screen.getByRole("link", { name: /Game Search/i });
    expect(logoElement).toHaveClass("logo");
  });

  it("es accesible", () => {
    renderWithRouterAndContext(<Header />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();

    // Verifica que todos los enlaces sean accesibles
    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link).toBeInTheDocument();
    });
  });
});