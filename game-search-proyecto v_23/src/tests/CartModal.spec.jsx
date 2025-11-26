import React, { createContext } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CartModal from "../components/CartModal"; // ← CAMBIÉ LA RUTA
// Si no funciona, prueba: import CartModal from "../../components/CartModal";

const mockOnClose = vi.fn();

const mockCartItems = [
  {
    id: 1,
    imagen: "test.jpg",
    nombre: "Producto 1",
    precio: 10000,
    cantidad: 2
  },
  {
    id: 2,
    nombre: "Producto 2",
    imagen: "test2.jpg",
    precio: 20000,
    cantidad: 1
  }
];

const mockCartContext = {
  cartItems: mockCartItems,
  removeItem: vi.fn(),
  changeQty: vi.fn(),
  clearCart: vi.fn(), // clearCart es parte del componente, no del context
  getTotalPrice: () => 40000,
  getTotalItems: () => 3
};

// Mock del CartContext
const CartContext = createContext();

const renderWithContext = (isOpen = true) => {
  return render(<CartModal isOpen={isOpen} onClose={mockOnClose} />);
};

describe("Componente CartModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Simular localStorage con items antes de cada prueba
    localStorage.setItem('cart', JSON.stringify(mockCartItems));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renderiza el modal cuando isOpen es true", () => {
    renderWithContext();
    expect(screen.getByText("Mi carrito")).toBeInTheDocument();
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
  });

  it("no renderiza el modal cuando isOpen es false", () => {
    renderWithContext(false);
    expect(screen.queryByText("Mi carrito")).not.toBeInTheDocument();
  });

  it("muestra el total correcto", () => {
    renderWithContext();
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
    expect(screen.getByText("$40.000")).toBeInTheDocument(); // El total se muestra en un <strong> separado
  });

  it("llama a onClose cuando se hace clic en el botón cerrar", () => {
    renderWithContext();
    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("elimina un producto cuando se hace clic en el botón eliminar", async () => {
    renderWithContext();
    const removeButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(removeButtons[0]);
    // Esperamos a que el DOM se actualice
    await waitFor(() => {
      expect(screen.queryByText("Producto 1")).not.toBeInTheDocument();
    });
  });

  it("llama a clearCart cuando se vacía el carrito", async () => {
    renderWithContext();
    const clearButton = screen.getByRole("button", { name: /vaciar/i }); // El botón solo dice "Vaciar"
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    });
  });

  it("muestra mensaje cuando el carrito está vacío", () => {
    // Limpiamos el localStorage para esta prueba específica
    localStorage.setItem('cart', JSON.stringify([]));

    renderWithContext();

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument(); // El mensaje real
  });
});