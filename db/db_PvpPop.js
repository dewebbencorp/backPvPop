const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.HOST,
  database: process.env.DB,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
  }
}

module.exports = dbConfig;
