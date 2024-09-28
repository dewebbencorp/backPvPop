const express = require('express');
const {testConnection} = require('./config/conexionDB');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');

})
testConnection()
 app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
 })