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

export const Connection = new Sequelize(config);