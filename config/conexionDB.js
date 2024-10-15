import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const Connection = new Sequelize(
  process.env.DB || '',
  process.env.USER || '',
  process.env.PASSWORD || '',
  {
<<<<<<< HEAD
    host: process.env.HOST || '',
    port: process.env.DB_PORT || '',
    logging: false,
    dialect: 'mssql',
=======
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 1433,  // Asegura que DB_PORT sea un número entero
    logging: false,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,                 // Usa `true` si SQL Server requiere conexión encriptada
        trustServerCertificate: true,   // Usa `true` si estás usando certificados auto-firmados
      },
    },
>>>>>>> c1d4ec409e557b9b197e5f0d51cc14abc7e32617
  }
);

export const connectDB = async () => {
  try {
    await Connection.authenticate();
<<<<<<< HEAD
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
=======
    console.log('[OK] Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('[ERROR] No se pudo conectar a la base de datos:', error.message);
    console.error('Asegúrate de que el servidor de base de datos está en ejecución y que las variables de entorno están configuradas correctamente.');
>>>>>>> c1d4ec409e557b9b197e5f0d51cc14abc7e32617
  }
};

export default Connection;
