// App.jsx
import { Routes, Route } from "react-router-dom";
import PaginaP from "./pages/VistaGeneral/paginaP";
import Productos from "./pages/VistaProducto/productos";
import Nosotros from "./pages/VistaGeneral/nosotros";
import Comunidad from "./pages/VistaGeneral/comunidad";
import Contacto from "./pages/VistaGeneral/contacto";
import IniRegUsuario from "./pages/VistaGeneral/ini_reg_usuario";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas del vendedor
import PPrincipalVendedor from "./pages/VistaVendedor/pPrincipalVendedor";
import ProductosVendedor from "./pages/VistaVendedor/productosVendedor";
import VerProductosVendedor from "./pages/VistaVendedor/verProductosVendedor";
import EdicionProductoVendedor from "./pages/VistaVendedor/edicionProductosVendedor";
import CrearProductoVendedor from "./pages/VistaVendedor/crearProductoVendedor";

// Páginas del administrador
import PPrincipalAdmin from "./pages/VistaAdmin/pPrincipalAdmin";
import ProductosAdmin from "./pages/VistaAdmin/productosAdmin";
import VerProductosAdmin from "./pages/VistaAdmin/verProductosAdmin";
import CrearProductosAdmin from "./pages/VistaAdmin/crearProductoAdmin";
import EdicionProductoAdmin from "./pages/VistaAdmin/edicionProductosAdmin";
import RegistroUsuarios from "./pages/VistaAdmin/registroUsuarios"; // ✅ CORREGIDO: antes estaba en VistaGeneral
import Usuarios from "./pages/VistaAdmin/usuarios";
import EditarUsuarios from "./pages/VistaAdmin/editarUsuarios";
import VerUsuario from "./pages/VistaAdmin/verUsuario";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<PaginaP />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/comunidad" element={<Comunidad />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<IniRegUsuario />} />

      {/* Vendedor */}
      <Route
        path="/vendedor"
        element={
          <ProtectedRoute roles={["vendedor", "admin"]}>
            <PPrincipalVendedor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendedor/productos"
        element={
          <ProtectedRoute roles={["vendedor", "admin"]}>
            <ProductosVendedor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendedor/productos/ver/:id"
        element={
          <ProtectedRoute roles={["vendedor", "admin"]}>
            <VerProductosVendedor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendedor/productos/editar/:id"
        element={
          <ProtectedRoute roles={["vendedor", "admin"]}>
            <EdicionProductoVendedor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendedor/productos/crear"
        element={
          <ProtectedRoute roles={["vendedor", "admin"]}>
            <CrearProductoVendedor />
          </ProtectedRoute>
        }
      />

      {/* Administrador */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <PPrincipalAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/productos"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ProductosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/productos/ver/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <VerProductosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/productos/crear"
        element={
          <ProtectedRoute roles={["admin"]}>
            <CrearProductosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/productos/editar/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EdicionProductoAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/usuarios/registro"
        element={
          <ProtectedRoute roles={["admin"]}>
            <RegistroUsuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Usuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/usuarios/editar"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EditarUsuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/usuarios/ver"
        element={
          <ProtectedRoute roles={["admin"]}>
            <VerUsuario />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
