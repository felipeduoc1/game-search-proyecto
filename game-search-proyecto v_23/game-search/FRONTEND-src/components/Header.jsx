import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import React, { useState, useEffect } from "react";
import CartModal from "./CartModal";
import { useAuth } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const total = cart.reduce((s, it) => s + (it.cantidad || 1), 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // ✅ Si no hay sesión, mandar a login cuando toca el carrito
  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsCartOpen(true);
    }
  };

  // ✅ Cierre de sesión
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="site-header bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">

          <div className="header-left">
            <Link to="/" className="logo fs-4 fw-bold text-white text-decoration-none">
              Game Search
            </Link>
          </div>

          <nav className="d-flex gap-4 align-items-center">
            <Link to="/productos" className="text-white text-decoration-none">Productos</Link>
            <Link to="/nosotros" className="text-white text-decoration-none">Nosotros</Link>
            <Link to="/comunidad" className="text-white text-decoration-none">Comunidad</Link>
            <Link to="/contacto" className="text-white text-decoration-none">Contacto</Link>

            {isAuthenticated ? (
              <>
                <span className="text-info small">
                  Iniciado como {user?.rol || "usuario"}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Iniciar Sesión
              </Link>
            )}
          </nav>

          <div className="header-right d-flex align-items-center">
            <div className="cart-wrap position-relative">
              <button
                className="btn btn-outline-light position-relative"
                onClick={handleCartClick}
              >
                🛒
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              </button>
              <span className="cart-label ms-2">Carrito</span>
            </div>
          </div>

        </div>
      </header>

      {/* ✅ Modal sólo si hay sesión */}
      {user && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
