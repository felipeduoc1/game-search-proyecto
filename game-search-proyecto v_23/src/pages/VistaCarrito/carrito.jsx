import React, { useEffect, useState } from "react";

// Importar mismas imágenes que usas en productos
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

export default function Carrito() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

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

  const clearCart = () => saveAndNotify([]);

  const subtotal = items.reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 1), 0);

  return (
    <main className="carrito-page" style={{ padding: 24 }}>
      <h1>Mi carrito de compras</h1>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="carrito-layout">
          <section className="carrito-list">
            {items.map((it) => (
              <article className="carrito-row" key={it.id}>
                <img className="carrito-thumb" src={it.imagen} alt={it.nombre} />
                <div className="carrito-detalle">
                  <h3>{it.nombre}</h3>
                  <p className="carrito-desc">{it.descripcion}</p>
                </div>

                <div className="carrito-acciones">
                  <div className="precio-unitario">${(it.precio || 0).toLocaleString("es-CL")}</div>

                  <div className="cantidad-controles">
                    <button onClick={() => changeQty(it.id, (it.cantidad || 1) - 1)}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={it.cantidad || 1}
                      onChange={(e) => changeQty(it.id, Number(e.target.value || 1))}
                    />
                    <button onClick={() => changeQty(it.id, (it.cantidad || 1) + 1)}>+</button>
                  </div>

                  <div className="subtotal-item">
                    ${((it.precio || 0) * (it.cantidad || 1)).toLocaleString("es-CL")}
                  </div>

                  <button className="btn-eliminar" onClick={() => removeItem(it.id)}>Eliminar</button>
                </div>
              </article>
            ))}
          </section>

          <aside className="carrito-resumen">
            <h2>Resumen</h2>
            <p>Subtotal: <strong>${subtotal.toLocaleString("es-CL")}</strong></p>
            <div className="cupon">
              <input type="text" placeholder="Código de descuento" />
              <button>Aplicar</button>
            </div>
            <button className="btn-pagar">Pagar ahora</button>
            <button className="btn-clear" onClick={clearCart}>Vaciar carrito</button>
          </aside>
        </div>
      )}
    </main>
  );
}