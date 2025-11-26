import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx"; // Añadimos la extensión .jsx

const mockProduct = {
  id: 1,
  nombre: "Cyberpunk 2077",
  descripcion: "Vive una historia futurista en Night City",
  precio: 39990,
  imagen: "cyberpunk.jpg",
  categoria: "RPG",
  stock: 10
};

const mockOnAddToCart = vi.fn();

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Componente ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza la información del producto correctamente", () => {
    renderWithRouter(
      <ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    expect(screen.getByText("Vive una historia futurista en Night City")).toBeInTheDocument();
    expect(screen.getByText("$39.990")).toBeInTheDocument();
    expect(screen.getByText("RPG")).toBeInTheDocument();
  });

  it("muestra la imagen del producto", () => {
    renderWithRouter(
      <ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const image = screen.getByAltText("Cyberpunk 2077");
    expect(image).toHaveAttribute("src", "cyberpunk.jpg");
  });

  it("llama a onAddToCart cuando se hace clic en el botón", () => {
    renderWithRouter(
      <ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(boton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("deshabilita el botón cuando no hay stock", () => {
    const outOfStockProduct = {
      ...mockProduct,
      stock: 0
    };

    renderWithRouter(
      <ProductCard producto={outOfStockProduct} onAddToCart={mockOnAddToCart} />
    );

    const boton = screen.getByRole("button", { name: /sin stock/i });
    expect(boton).toBeDisabled();
  });

  it("muestra el enlace de detalles del producto", () => {
    renderWithRouter(
      <ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const detailsLink = screen.getByRole("link", { name: /ver detalles/i });
    expect(detailsLink).toHaveAttribute("href", "/producto/1");
  });

  it("aplica clases CSS correctamente", () => {
    renderWithRouter(
      <ProductCard producto={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const cardElement = screen.getByTestId("product-card");
    expect(cardElement).toHaveClass("product-card");
  });

  it("maneja producto sin imagen", () => {
    const productWithoutImage = {
      ...mockProduct,
      imagen: null
    };

    renderWithRouter(
      <ProductCard producto={productWithoutImage} onAddToCart={mockOnAddToCart} />
    );

    const image = screen.getByAltText("Cyberpunk 2077");
    expect(image).toHaveAttribute("src", "/placeholder-image.jpg");
  });
});