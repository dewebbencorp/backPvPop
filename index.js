const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const ticketsRoute = require('./routes/tickets');
const salesRoutes = require('./routes/salesRoutes');

app.use(express.json());

app.use('/api/tickets', ticketsRoute);
app.use('/api/sales', salesRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
