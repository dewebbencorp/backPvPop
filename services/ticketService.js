import { Connection } from '../config/conexionDB.js';

// Función para obtener los detalles de un ticket por su número (No_Tick)
const obtenerTicketPorNumero = async (No_Tick) => {
  try {
    const ticket = await Connection.query(
      `
      SELECT t.No_Tick AS remision,
             t.Fecha_Vta AS fecha,
             c.Nombre_Cliente AS cliente,
             t.Tipo_Mov AS tipo,
             t.Total_P AS total,
             t.Cancelado AS cx,
             t.Cortesia AS cort,
             t.MontoBono AS com,
             v.Nom_Vendedor AS vendedor,
             e.Empresa AS tienda,
             e.Direccion AS direccion_tienda,
             t.Cajera AS cajero -- Agregar el campo Cajera
      FROM Ticket t
      JOIN Clientes c ON t.Clav_Cliente = c.Clav_Cliente
      JOIN Vendedores v ON t.No_Vend = v.No_Vend
      JOIN Empresas e ON t.Clav_Empresa = e.Clav_Empresa
      WHERE t.No_Tick = :No_Tick
      `,
      {
        type: Connection.QueryTypes.SELECT,
        replacements: { No_Tick },
      }
    );

    const productos = await Connection.query(
      `
      SELECT dt.Desc_Art AS descripcion, 
             dt.Cant AS cantidad, 
             dt.PrecioU AS precio_unitario, 
             dt.Total_P AS total
      FROM Det_Ticket dt
      WHERE dt.No_Tick = :No_Tick
      `,
      {
        type: Connection.QueryTypes.SELECT,
        replacements: { No_Tick },
      }
    );

    if (!ticket.length) return null;

    // Formatear la respuesta final
    return {
      ...ticket[0],
      productos,
      importe: ticket[0].total,
      descuento: 0.0,
      subtotal: ticket[0].total,
      iva: 0.0,
      ieps: 0.0,
      total: ticket[0].total,
      pago: ticket[0].total,
      cambio: 0.0,
    };
  } catch (error) {
    console.error('Error obteniendo ticket por número:', error);
    throw error;
  }
};

export default {
  obtenerTicketPorNumero,
};
