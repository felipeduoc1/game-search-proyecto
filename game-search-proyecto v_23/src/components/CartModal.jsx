import React, { useEffect, useState } from "react";

import EldenRing from "../img/Elden-Ring.webp";
import Zelda from "../img/Zelda.webp";
import CODMW from "../img/COD-MW.jpg";
import FIFA23 from "../img/FIFA-23.jpg";
import Cyberpunk from "../img/Cyberpunk.webp";
import Horizon from "../img/Horizon.webp";
import Halo from "../img/Halo.jpg";
import AnimalCrossing from "../img/Animal-Crossing.webp";
import FinalFantasy from "../img/Final-Fantasy.webp";
import Starfield from "../img/Starfield.jpg";
import ZeldaEchoes from "../img/Zelda-Echoes.webp";
import SpiderMan from "../img/SpiderMan.avif";

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
  if (!src) return "";
  if (typeof src === "string") return imagenes[src] || src;
  return src;
}

export default function CartModal({ isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState({ type: null, value: 0 });
  const [couponMsg, setCouponMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [isOpen]);

  const loadCart = () => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(raw);
      const normalized = cart.map((it) => ({
        id: it.id,
        nombre: it.nombre || "Sin nombre",
        descripcion: it.descripcion || "",
        precio: Number(it.precio || 0),
        cantidad: Number(it.cantidad || 1),
        imagen: resolveImagen(it.imagen),
      }));
      setItems(normalized);
    } catch {
      setItems([]);
    }
  };

  const saveAndNotify = (newItems) => {
    const serializable = newItems.map((it) => ({
      id: it.id,
      nombre: it.nombre,
      descripcion: it.descripcion,
      precio: it.precio,
      cantidad: it.cantidad,
      imagen: typeof it.imagen === "string" ? it.imagen : it.imagen,
    }));
    localStorage.setItem("cart", JSON.stringify(serializable));
    setItems(newItems);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => saveAndNotify(items.filter((i) => i.id !== id));

  const changeQty = (id, qty) => {
    const next = items.map((it) =>
      it.id === id ? { ...it, cantidad: Math.max(1, Number(qty) || 1) } : it
    );
    saveAndNotify(next);
  };

  const clearCart = () => {
    saveAndNotify([]);
    setCoupon("");
    setDiscount({ type: null, value: 0 });
    setCouponMsg("");
  };

  const subtotal = items.reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 1), 0);

  const discountAmount = (() => {
    if (!discount.type) return 0;
    if (discount.type === "percent") return Math.round((subtotal * discount.value) / 100);
    return discount.value;
  })();

  const total = Math.max(subtotal - discountAmount, 0);

  const applyCoupon = () => {
    const code = (coupon || "").trim().toUpperCase();
    if (!code) {
      setCouponMsg("Ingresa un código");
      return;
    }

    if (code === "DESCUENTO10") {
      setDiscount({ type: "percent", value: 10 });
      setCouponMsg("10% aplicado");
    } else if (code === "PROMO5000") {
      setDiscount({ type: "fixed", value: 5000 });
      setCouponMsg("$5.000 descontados");
    } else {
      setDiscount({ type: null, value: 0 });
      setCouponMsg("Código inválido");
    }
  };

  // NUEVA FUNCIÓN: Procesar pago
  const processPayment = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Simular proceso de pago (3 segundos)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Vaciar carrito
    clearCart();
    setIsProcessing(false);
    setPaymentSuccess(true);

    // Ocultar mensaje después de 3 segundos y cerrar modal
    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" role="dialog" aria-modal="true">
      <div className="cart-modal" aria-label="Carrito de compras">
        <header className="cart-modal-header">
          <h2>Mi carrito</h2>
          <button className="cart-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        </header>

        <div className="cart-modal-body">
          {paymentSuccess ? (
            <div className="payment-success">
              <div className="success-icon">✅</div>
              <h3>¡Pago Exitoso!</h3>
              <p>Tu pedido ha sido procesado correctamente.</p>
              <p>Recibirás un correo de confirmación pronto.</p>
            </div>
          ) : (
            <>
              <div className="cart-items-wrap">
                {items.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ul className="cart-items">
                    {items.map((it) => (
                      <li key={it.id} className="cart-item">
                        <img src={it.imagen} alt={it.nombre} />
                        <div className="cart-item-info">
                          <strong>{it.nombre}</strong>
                          <small className="cart-item-desc">{it.descripcion}</small>
                          <div className="cart-item-controls">
                            <button
                              onClick={() => changeQty(it.id, (it.cantidad || 1) - 1)}
                              disabled={isProcessing}
                            >-</button>
                            <input
                              type="number"
                              min="1"
                              value={it.cantidad || 1}
                              onChange={(e) => changeQty(it.id, Number(e.target.value || 1))}
                              disabled={isProcessing}
                            />
                            <button
                              onClick={() => changeQty(it.id, (it.cantidad || 1) + 1)}
                              disabled={isProcessing}
                            >+</button>

                            <span className="cart-item-price">${((it.precio || 0) * (it.cantidad || 1)).toLocaleString("es-CL")}</span>
                            <button
                              className="btn-eliminar"
                              onClick={() => removeItem(it.id)}
                              disabled={isProcessing}
                            >Eliminar</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside className="cart-modal-summary">
                <h3>Resumen</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>${subtotal.toLocaleString("es-CL")}</strong>
                </div>

                <div className="summary-row">
                  <span>Descuento</span>
                  <strong>-${discountAmount.toLocaleString("es-CL")}</strong>
                </div>

                <div className="summary-row total-row">
                  <span>TOTAL</span>
                  <strong>${total.toLocaleString("es-CL")}</strong>
                </div>

                <div className="coupon-area">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={isProcessing}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={isProcessing}
                  >Aplicar</button>
                </div>
                {couponMsg && <div className="coupon-msg">{couponMsg}</div>}

                <div className="cart-actions">
                  <button
                    className="btn-clear"
                    onClick={clearCart}
                    disabled={isProcessing}
                  >Vaciar</button>
                  <button
                    className={`btn-pagar ${isProcessing ? 'processing' : ''}`}
                    onClick={processPayment}
                    disabled={isProcessing || items.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        Procesando Pago...
                      </>
                    ) : (
                      `Pagar Ahora - $${total.toLocaleString("es-CL")}`
                    )}
                  </button>
                </div>
              </aside>
            </>
          )}
        </div>
      </div>
    </div>
  );
}