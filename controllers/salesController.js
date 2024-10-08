// controllers/salesController.js
const salesModel = require('../models/salesModel');

async function obtenerVentas(req, res) {
  try {
    const ventas = await salesModel.obtenerVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function agregarVenta(req, res) {
  try {
    const nuevaVenta = req.body;
    const resultado = await salesModel.agregarVenta(nuevaVenta);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerVentas,
  agregarVenta
};
