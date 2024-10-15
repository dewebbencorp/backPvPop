import Venta from '../models/salesModel.js';
import jwt from 'jsonwebtoken';

export const obtenerVentas = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo ventas: ' + error.message });
  }
};

export const agregarVenta = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const { articulo, cantidad, precio, descuento, total } = req.body;

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
