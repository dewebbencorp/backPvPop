const {Sequelize} = require('sequelize');
require('dotenv').config();
const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: 'mssql'
  });

// Función para probar la conexión
async function testConnection() {
    try {
      await sequelize.authenticate(); // Intenta autenticar la conexión
      console.log('Conexión exitosa a la base de datos.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    } finally {
      await sequelize.close(); // Cierra la conexión después de la prueba
    }
  }
  
module.exports = {
    testConnection
};