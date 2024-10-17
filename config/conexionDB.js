import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: process.env.DB || '',
  username: process.env.USER || '',
  password: process.env.PASSWORD || '',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  dialect: 'mssql',
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
};

let connection;

const verificarConexion = async () => {
  if (!connection) {
    console.log("Estableciendo nueva conexión a la base de datos...");
    connection = new Sequelize(config);
    await connection.authenticate();
  }
  return connection;
};

export const conectarDB = async () => {
  try {
    const db = await verificarConexion();
    console.log('[OK] Conexión establecida con éxito a la base de datos.');
    return db;
  } catch (error) {
    console.error('[ERROR] No se pudo conectar a la base de datos:', error.message);
    throw error; // Propaga el error para manejarlo en los controladores
  }
};

export const cerrarDB = async () => {
  try {
    if (connection) {
      await connection.close();
      console.log('Conexión a la base de datos cerrada.');
      connection = null; // Limpia la conexión para futuras conexiones
    }
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error.message);
  }
};

export default { conectarDB, cerrarDB };
