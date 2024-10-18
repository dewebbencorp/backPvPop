import { Connection } from "../config/conexionDB2.js";
import Productos from '../models/productsModel.js';
import CatArticulos from '../models/catArticulosModel.js';
// Función para obtener todas las ventas
const obtenerTodasLasVentas = async () => {
  try {
    const ventas = await Ventas.findAll({
      include: [
        {
          model: Productos,
          as: 'producto', // Alias definido en la asociación
          attributes: ['Clav_Art'],
          where: {
            Clav_Empresa: 'Play',
            Clav_Alm: 'Pop',
          },
        },
      ],
      attributes: ['Clav_Art', 'Cantidad', 'Precio', 'Total_P', 'Descuento'],
    });
    return ventas;
  } catch (error) {
    console.error('Error obteniendo ventas:', error);
    throw error;
  }
};

// Función para agregar una nueva venta
const agregarVenta = async (venta) => {
  try {
    const { Clav_Art, cantidad, precio, descuento, total } = venta;
    const nuevaVenta = await Ventas.create({
      Clav_Art,
      Cantidad: cantidad,
      Precio: precio,
      Descuento: descuento,
      Total_P: total,
      Clav_Alm: 'Pop', // Valores fijos como en tu código original
      Clav_Empresa: 'Play',
    });
    return nuevaVenta;
  } catch (error) {
    console.error('Error agregando venta:', error);
    throw error;
  }
};

const buscarArticuloPorClave = async (clave) => {
  try {
    console.log("Buscando artículo con clave:", clave);

    const articulo = await Productos.findOne({
      where: {
        Clav_Art: clave,
        Clav_Alm: 'Pop',
        Clav_Empresa: 'Play'
      },
      include: [{
        model: CatArticulos,
        attributes: ['Desc_Art', 'Confoto']
      }],
      attributes: ['Clav_Art', 'Exist', 'Precio1']
    });

    console.log("Resultado de la consulta SQL:", articulo);
    return articulo ? articulo : null;  // Si no existe, devolvemos null
  } catch (error) {
    console.error("Error buscando artículo:", error);
    throw error;
  }
};

// Función para eliminar una venta por ID
const eliminarVenta = async (id) => {
  try {
    const result = await Ventas.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error('Error eliminando venta:', error);
    throw error;
  }
};

export default {
  obtenerTodasLasVentas,
  agregarVenta,
  buscarArticuloPorClave,
  eliminarVenta,
};