import React, { useEffect, useState } from "react";
import "../../styles/carrito.css"; // Asegúrate de crear este CSS

// Importar imágenes locales
import EldenRing from "../../img/Elden-Ring.webp";
import Zelda from "../../img/Zelda.webp";
import CODMW from "../../img/COD-MW.jpg";
import FIFA23 from "../../img/FIFA-23.jpg";
import Cyberpunk from "../../img/Cyberpunk.webp";
import Horizon from "../../img/Horizon.webp";
import Halo from "../../img/Halo.jpg";
import AnimalCrossing from "../../img/Animal-Crossing.webp";
import FinalFantasy from "../../img/Final-Fantasy.webp";
import Starfield from "../../img/Starfield.jpg";
import ZeldaEchoes from "../../img/Zelda-Echoes.webp";
import SpiderMan from "../../img/SpiderMan.avif";

const imagenes = {
  "img/Elden-Ring.webp": EldenRing,
  "img/Zelda.webp": Zelda,
  "img/COD-MW.jpg": CODMW,
  "img/FIFA-23.jpg": FIFA23,
  "img/Cyberpunk.webp": Cyberpunk,
  "img/Horizon.webp": Horizon,
  "img/Halo.jpg": Halo,
  "img/Animal-Crossing.webp": AnimalCrossing,
  "img/Final-Fantasy.webp": FinalFantasy,
  "img/Starfield.jpg": Starfield,
  "img/Zelda-Echoes.webp": ZeldaEchoes,
  "img/SpiderMan.avif": SpiderMan,
};

function resolveImagen(src) {
  if (!src) return "https://via.placeholder.com/100";
  if (src.startsWith("http")) return src;
  return imagenes[src] || "https://via.placeholder.com/100";
}

// Recibimos la función "onClose" para cerrar el modal
export default function CarritoModal({ onClose }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito al iniciar
  useEffect(() => {
    loadCart();
    // Escuchar cambios en el carrito desde otras pestañas o componentes
    const handler = () => loadCart();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  const loadCart = () => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(raw);
      setItems(cart);
      calculateTotal(cart);
    } catch {
      setItems([]);
    }
  };

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
    setTotal(sum);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const newCart = items.map(item =>
      item.id === id ? { ...item, cantidad: newQty } : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setItems(newCart);
    calculateTotal(newCart);
    window.dispatchEvent(new Event("cartUpdated")); // Notificar cambio
  };

  const removeItem = (id) => {
    const newCart = items.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setItems(newCart);
    calculateTotal(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>🛒 Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <p className="empty-cart-msg">Tu carrito está vacío 😢</p>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={resolveImagen(item.imagen)} alt={item.nombre} />

                  <div className="item-details">
                    <h3>{item.nombre}</h3>
                    <p className="item-category">{item.categoria || "Juego"}</p>
                    <span className="item-price">${item.precio.toLocaleString("es-CL")}</span>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, (item.cantidad || 1) - 1)}>-</button>
                      <span>{item.cantidad || 1}</span>
                      <button onClick={() => updateQuantity(item.id, (item.cantidad || 1) + 1)}>+</button>
                    </div>
                    <button className="delete-btn" onClick={() => removeItem(item.id)}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>Total:</span>
            <span className="total-price">${total.toLocaleString("es-CL")}</span>
          </div>
          <button className="checkout-btn" disabled={items.length === 0}>
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}