import React, { createContext } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PaginaP from "../pages/VistaGeneral/paginaP.jsx"; // ← POSIBLE CAMBIO: PaginaP en vez de paginaP

const mockProducts = [
  {
    id: 1,
    nombre: "Cyberpunk 2077",
    descripcion: "Juego de rol futurista",
    precio: 39990,
    imagen: "cyberpunk.jpg",
    categoria: "RPG"
  },
  {
    id: 2,
    nombre: "FIFA 24",
    descripcion: "Juego de fútbol",
    precio: 49990,
    imagen: "fifa24.jpg",
    categoria: "Deportes"
  }
];

const mockProductContext = {
  products: mockProducts,
  loading: false,
  error: null,
  categories: ["RPG", "Deportes"],
  selectedCategory: "",
  setSelectedCategory: vi.fn(),
  searchTerm: "",
  setSearchTerm: vi.fn()
};

const mockCartContext = {
  addToCart: vi.fn()
};

// Mock de los Contextos
const ProductContext = createContext();
const CartContext = createContext();

const renderWithContexts = (component) => {
  return render(
    <BrowserRouter>
      <ProductContext.Provider value={mockProductContext}>
        <CartContext.Provider value={mockCartContext}>
          {component}
        </CartContext.Provider>
      </ProductContext.Provider>
    </BrowserRouter>
  );
};

describe("Componente PaginaP", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el título principal", () => {
    renderWithContexts(<PaginaP />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("muestra todos los productos cuando se carga", () => {
    renderWithContexts(<PaginaP />);

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    expect(screen.getByText("FIFA 24")).toBeInTheDocument();
    expect(screen.getByText("$39.990")).toBeInTheDocument();
    expect(screen.getByText("$49.990")).toBeInTheDocument();
  });

  it("muestra filtros de categoría", () => {
    renderWithContexts(<PaginaP />);

    expect(screen.getByLabelText(/categoría/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("muestra barra de búsqueda", () => {
    renderWithContexts(<PaginaP />);

    const searchInput = screen.getByPlaceholderText(/buscar productos/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("filtra productos cuando se cambia categoría", async () => {
    renderWithContexts(<PaginaP />);

    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "RPG" } });

    expect(mockProductContext.setSelectedCategory).toHaveBeenCalledWith("RPG");
  });

  it("filtra productos cuando se busca", async () => {
    renderWithContexts(<PaginaP />);

    const searchInput = screen.getByPlaceholderText(/buscar productos/i);
    fireEvent.change(searchInput, { target: { value: "Cyberpunk" } });

    expect(mockProductContext.setSearchTerm).toHaveBeenCalledWith("Cyberpunk");
  });

  it("muestra estado de carga", () => {
    const loadingContext = {
      ...mockProductContext,
      loading: true
    };

    render(
      <BrowserRouter>
        <ProductContext.Provider value={loadingContext}>
          <CartContext.Provider value={mockCartContext}>
            <PaginaP />
          </CartContext.Provider>
        </ProductContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    const errorContext = {
      ...mockProductContext,
      error: "Error al cargar productos"
    };

    render(
      <BrowserRouter>
        <ProductContext.Provider value={errorContext}>
          <CartContext.Provider value={mockCartContext}>
            <PaginaP />
          </CartContext.Provider>
        </ProductContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/error al cargar productos/i)).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay productos", () => {
    const emptyContext = {
      ...mockProductContext,
      products: []
    };

    render(
      <BrowserRouter>
        <ProductContext.Provider value={emptyContext}>
          <CartContext.Provider value={mockCartContext}>
            <PaginaP />
          </CartContext.Provider>
        </ProductContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument();
  });
});