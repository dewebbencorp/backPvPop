import jwt from 'jsonwebtoken';
import salesService from '../services/salesService.js';

// Función para obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const ventas = await salesService.obtenerTodasLasVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo ventas: ' + error.message });
  }
};

// Función para agregar una nueva venta con validaciones
export const agregarVenta = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const venta = req.body;

    // Realizar validaciones y agregar la venta
    const nuevaVenta = await salesService.agregarVenta(venta);
    res.status(201).json({ message: 'Venta agregada exitosamente', nuevaVenta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarArticulo = async (req, res) => {
  console.log("entre en controller");
  
  try {
    const { clave } = req.params;

    // Validar si la clave fue enviada
    if (!clave) {
      return res.status(400).json({ message: 'La clave del artículo es requerida.' });
    }

    const articulo = await salesService.buscarArticuloPorClave(clave);

    // Validar si el artículo existe
    if (!articulo) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando artículo: ' + error.message });
  }
};

export default {
  obtenerVentas,
  agregarVenta,
  buscarArticulo,
};