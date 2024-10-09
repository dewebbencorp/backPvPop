import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const Connection = new Sequelize(
  process.env.DB || '',
  process.env.USER || '',
  process.env.PASSWORD || '',
  {
    host: process.env.HOST || '',
    port: process.env.DB_PORT || '',
    logging: false,
    dialect: 'mssql',
  }
);


export const connectDB = async () => {
  try {
    await Connection.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

export default Connection;
