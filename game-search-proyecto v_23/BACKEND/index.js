// /mi-backend/index.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database'); // Nuestro módulo de DB (opcional)

const app = express();
const port = process.env.PORT || 3001; // Usamos un puerto diferente al del frontend
const jwtSecret = process.env.JWT_SECRET || 'super-secret-token';
const useDatabase = process.env.USE_DB === 'true';

// Usuarios de ejemplo (se almacenan en memoria para la demo)
const seedUsers = [
    {
        id: 1,
        nombre: 'Admin',
        email: 'admin@gamesearch.com',
        password: bcrypt.hashSync('Admin123!', 10),
        rol: 'admin'
    },
    {
        id: 2,
        nombre: 'Vendedor',
        email: 'vendedor@gamesearch.com',
        password: bcrypt.hashSync('Vendedor123!', 10),
        rol: 'vendedor'
    },
    {
        id: 3,
        nombre: 'Cliente',
        email: 'cliente@gamesearch.com',
        password: bcrypt.hashSync('Cliente123!', 10),
        rol: 'cliente'
    }
];

// Uso de un Map para permitir búsquedas rápidas por email
const usersByEmail = new Map(seedUsers.map((u) => [u.email, u]));

// Middleware para poder leer JSON en el body de las peticiones y permitir CORS
app.use(cors());
app.use(express.json());

// Helpers
function generarToken(usuario) {
    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    return jwt.sign(payload, jwtSecret, { expiresIn: '4h' });
}

function sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
}

// Middleware de autenticación
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
        req.user = user;
        next();
    });
}

function authorizeRoles(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
        }
        next();
    };
}

// --- RUTAS DE AUTENTICACIÓN ---
app.post('/api/auth/register', (req, res) => {
    const { nombre, email, password, rol = 'cliente' } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Nombre, email y password son requeridos.' });
    }

    if (usersByEmail.has(email)) {
        return res.status(409).json({ message: 'El email ya está registrado.' });
    }

    const id = usersByEmail.size + 1;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const nuevoUsuario = { id, nombre, email, password: hashedPassword, rol };

    usersByEmail.set(email, nuevoUsuario);

    const token = generarToken(nuevoUsuario);
    res.status(201).json({ user: sanitizeUser(nuevoUsuario), token });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    const usuario = usersByEmail.get(email);
    if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const passwordCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!passwordCorrecta) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = generarToken(usuario);
    res.json({ user: sanitizeUser(usuario), token });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    const usuario = Array.from(usersByEmail.values()).find((u) => u.id === req.user.sub);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ user: sanitizeUser(usuario) });
});

// --- RUTAS PROTEGIDAS DE EJEMPLO ---
app.get('/api/admin/usuarios', authenticateToken, authorizeRoles('admin'), (req, res) => {
    const usuarios = Array.from(usersByEmail.values()).map(sanitizeUser);
    res.json({ usuarios });
});

app.get('/api/vendedor/resumen', authenticateToken, authorizeRoles('vendedor', 'admin'), (req, res) => {
    res.json({
        mensaje: 'Acceso permitido al panel de vendedor',
        usuario: req.user
    });
});

app.get('/api/cliente/perfil', authenticateToken, (req, res) => {
    res.json({
        mensaje: 'Perfil de cliente obtenido correctamente',
        usuario: req.user
    });
});

// --- INICIO DEL SERVIDOR ---

async function startup() {
    console.log('Iniciando aplicación...');
    try {
        if (useDatabase) {
            console.log('Inicializando módulo de base de datos...');
            await db.initialize(); // Inicia el pool de conexiones
        } else {
            console.log('USE_DB no está habilitado. Se usará el almacenamiento en memoria para usuarios.');
        }

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });

    } catch (err) {
        console.error('Error durante el inicio:', err);
        console.error('El servicio de autenticación seguirá funcionando con almacenamiento en memoria.');
    }
}

startup();

// Manejar el cierre gracefully
process.on('SIGTERM', async () => {
    console.log('Recibida señal SIGTERM. Cerrando...');
    if (useDatabase) {
        await db.close();
    }
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('Recibida señal SIGINT. Cerrando...');
    if (useDatabase) {
        await db.close();
    }
    process.exit(0);
});


