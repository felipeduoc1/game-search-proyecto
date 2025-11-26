const oracledb = require('oracledb');
require('dotenv').config(); // Carga las variables del archivo .env

// ❗ Importante:
// NO llamar a oracledb.initOracleClient()
// Esto activa el modo THIN que NO requiere Oracle Client instalado.

// Configuración del pool de conexiones usando variables de entorno
const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
    poolMin: 10, // Mínimo de conexiones en el pool
    poolMax: 10, // Máximo de conexiones que se pueden crear
    poolIncrement: 0 // No crear más conexiones si se alcanza el máximo
};

// Función para inicializar el pool de conexiones
async function initialize() {
    try {
        await oracledb.createPool(poolConfig);
        console.log('Pool de conexiones de Oracle creado exitosamente.');
    } catch (err) {
        console.error('Error al crear el pool de conexiones:', err);
        process.exit(1); // Salir de la aplicación si el pool no se puede crear
    }
}

// Función para cerrar el pool de conexiones (al apagar el servidor)
async function close() {
    try {
        await oracledb.getPool().close(10);
        console.log('Pool de conexiones cerrado.');
    } catch (err) {
        console.error('Error al cerrar el pool de conexiones:', err);
    }
}

// Función genérica para ejecutar sentencias SQL (SELECT, INSERT, UPDATE, DELETE)
async function execute(sql, binds = [], options = {}) {
    let connection;
    try {
        // 1. Obtener una conexión del pool
        connection = await oracledb.getConnection();

        // 2. Configurar opciones por defecto
        const defaultOptions = {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // Devuelve filas como objetos
            autoCommit: true // Importante para INSERT, UPDATE, DELETE
        };
        const finalOptions = { ...defaultOptions, ...options };

        // 3. Ejecutar la consulta
        const result = await connection.execute(sql, binds, finalOptions);
        return result;

    } catch (err) {
        console.error('Error ejecutando SQL:', err);
        throw err; // Relanzar el error para que el llamador lo maneje
    } finally {
        if (connection) {
            try {
                // 4. Devolver la conexión al pool
                await connection.close();
            } catch (err) {
                console.error('Error al devolver la conexión al pool:', err);
            }
        }
    }
}

module.exports = { initialize, close, execute };
