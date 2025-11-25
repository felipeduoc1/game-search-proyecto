// /mi-backend/index.js

const express = require('express');
const db = require('./database'); // Nuestro módulo de DB

const app = express();
const port = 3001; // Usamos un puerto diferente al del frontend

// Middleware para poder leer JSON en el body de las peticiones
app.use(express.json());

// --- RUTAS DE LA API ---

// Endpoint para crear un nuevo usuario
// POST /api/usuarios
app.post('/api/usuarios', async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validación simple
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Nombre, email y password son requeridos.' });
    }

    try {
        const sql = `INSERT INTO usuarios (nombre, email, password) VALUES (:nombre, :email, :password)`;
        const binds = { nombre, email, password }; // En un caso real, la contraseña debería estar hasheada

        await db.execute(sql, binds);

        res.status(201).json({ message: 'Usuario creado exitosamente.' });

    } catch (error) {
        // Manejo de errores, por ejemplo, si el email ya existe (error ORA-00001)
        if (error.errorNum === 1) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor al crear el usuario.' });
    }
});

// --- INICIO DEL SERVIDOR ---

async function startup() {
    console.log('Iniciando aplicación...');
    try {
        console.log('Inicializando módulo de base de datos...');
        await db.initialize(); // Inicia el pool de conexiones

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });

    } catch (err) {
        console.error('Error durante el inicio:', err);
        process.exit(1);
    }
}

startup();

// Manejar el cierre gracefully
process.on('SIGTERM', async () => {
    console.log('Recibida señal SIGTERM. Cerrando...');
    await db.close();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('Recibida señal SIGINT. Cerrando...');
    await db.close();
    process.exit(0);
});


