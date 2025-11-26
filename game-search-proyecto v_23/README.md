# Game Search - Autenticación y Roles

## Backend
- API Node/Express con autenticación basada en tokens JWT.
- Usuarios de ejemplo en memoria con contraseñas encriptadas (admin, vendedor, cliente).
- Middlewares `authenticateToken` y `authorizeRoles` protegen rutas y verifican roles.
- Endpoints principales: `/api/auth/login`, `/api/auth/register`, `/api/auth/me` y rutas protegidas para admin, vendedor y cliente.

## Frontend
- Contexto de autenticación (`AuthContext`) que persiste sesión en `localStorage` (token + usuario).
- `ProtectedRoute` bloquea rutas si no hay sesión o si el rol no tiene permisos.
- `App.jsx` aplica las rutas protegidas para vistas de administrador y vendedor.

## Uso rápido
- Clonar el repo y ubicarse en `game-search-proyecto v_23`.
- Backend: `cd BACKEND && npm install && npm start` (puerto 3001 por defecto).
- Frontend: `cd game-search && npm install && npm run dev` (Vite en puerto 5173 por defecto).
- Credenciales demo:
  - Admin: `admin@gamesearch.com` / `Admin123!`
  - Vendedor: `vendedor@gamesearch.com` / `Vendedor123!`
  - Cliente: `cliente@gamesearch.com` / `Cliente123!`
