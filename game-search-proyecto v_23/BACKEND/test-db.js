// Importa el driver de Oracle
const oracledb = require('oracledb');

// --- ¡IMPORTANTE! ---
// Llama a initOracleClient() ANTES de cualquier otra llamada a oracledb.
// Esto le dice al driver dónde encontrar las librerías del Instant Client.
// Reemplaza 'C:\\oracle\\instantclient_21_3' con la ruta REAL donde descomprimiste el Instant Client.
try {
    oracledb.initOracleClient({ libDir: "C:\\Users\\Israel\\instantclient-basic-windows.x64-23.26.0.0.0\\instantclient_23_0" });
} catch (err) {
    console.error('Error al iniciar el Oracle Client:', err);
    process.exit(1);
}

// Configuración de la conexión a tu base de datos
// Reemplaza estos valores con los de tu base de datos Oracle
const dbConfig = {
    user: 'SYSTEM', // Intenta con SYSTEM, que es un usuario administrador por defecto.
    password: '86377341Israel', // Asegúrate de que esta es la contraseña que creaste al instalar Oracle XE.
    connectString: 'localhost:1521/XEPDB1' // Ejemplo: 'localhost:1521/XEPDB1'
};

// Función asíncrona para probar la conexión
async function testConnection() {
    let connection;

    try {
        // Obtiene una conexión del pool
        connection = await oracledb.getConnection(dbConfig);
        console.log('¡Conexión a la base de datos Oracle exitosa!');

        // Ejecuta una consulta simple para verificar
        const result = await connection.execute('SELECT SYSDATE FROM DUAL');
        console.log('Fecha y hora del servidor de base deatos:', result.rows[0][0]);

    } catch (err) {
        console.error('Error durante la conexión o consulta:', err);
    } finally {
        if (connection) {
            try {
                // Cierra la conexión para liberar el recurso
                await connection.close();
                console.log('Conexión cerrada.');
            } catch (err) {
                console.error('Error al cerrar la conexión:', err);
            }
        }
    }
}

// Llama a la función para probar la conexión
testConnection();
