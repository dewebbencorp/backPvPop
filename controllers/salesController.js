import Venta from '../models/salesModel.js';

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo ventas: ' + error.message });
  }
};

export const agregarVenta = async (req, res) => {
  const { articulo, cantidad, precio, descuento, total } = req.body;

  try {
    const nuevaVenta = await Venta.create({
      articulo,
      cantidad,
      precio,
      descuento,
      total,
    });
    res.status(201).json({ message: 'Venta agregada exitosamente', nuevaVenta });
  } catch (error) {
    res.status(500).json({ error: 'Error agregando venta: ' + error.message });
  }
};

export default {
  obtenerVentas,
  agregarVenta,
};
