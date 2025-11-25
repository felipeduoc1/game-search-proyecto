// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PaginaP from "./pages/VistaGeneral/paginaP";
import Productos from "./pages/VistaProducto/productos";
import Nosotros from "./pages/VistaGeneral/nosotros";
import Comunidad from "./pages/VistaGeneral/comunidad";
import Contacto from "./pages/VistaGeneral/contacto";
import IniRegUsuario from "./pages/VistaGeneral/ini_reg_usuario";

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
      <Route path="/vendedor" element={<PPrincipalVendedor />} />
      <Route path="/vendedor/productos" element={<ProductosVendedor />} />
      <Route path="/vendedor/productos/ver/:id" element={<VerProductosVendedor />} />
      <Route path="/vendedor/productos/editar/:id" element={<EdicionProductoVendedor />} />
      <Route path="/vendedor/productos/crear" element={<CrearProductoVendedor />} />

      {/* Administrador */}
      <Route path="/admin" element={<PPrincipalAdmin />} />
      <Route path="/admin/productos" element={<ProductosAdmin />} />
      <Route path="/admin/productos/ver/:id" element={<VerProductosAdmin />} />
      <Route path="/admin/productos/crear" element={<CrearProductosAdmin />} />
      <Route path="/admin/productos/editar/:id" element={<EdicionProductoAdmin />} />
      <Route path="/admin/usuarios/registro" element={<RegistroUsuarios />} /> {/* ✅ Ruta correcta */}
      <Route path="/admin/usuarios" element={<Usuarios />} />
      <Route path="/admin/usuarios/editar" element={<EditarUsuarios />} />
      <Route path="/admin/usuarios/ver" element={<VerUsuario />} />
    </Routes>
  );
}

export default App;
