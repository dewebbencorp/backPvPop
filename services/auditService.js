import { Connection } from '../config/conexionDB.js';

// Obtener todas las auditorías
const obtenerTodasAuditorias = async () => {
  try {
    const auditorias = await Connection.query(
      `
      SELECT t.No_Tick AS remision, 
             t.Fecha_Vta AS fecha, 
             c.Nombre_Cliente AS cliente,
             t.Tipo_Vta AS tipo,
             t.Tipo_Mov AS movimiento,
             t.Total_P AS total,
             t.Cancelado AS cx,
             t.Cortesia AS cort,
             t.MontoBono AS com,
             v.Nom_Vendedor AS vendedor
      FROM Ticket t
      JOIN Clientes c ON t.Clav_Cliente = c.Clav_Cliente
      JOIN Vendedores v ON t.No_Vend = v.No_Vend
      WHERE t.Total_P IS NOT NULL
      ORDER BY t.Fecha_Vta DESC
      `,
      { type: Connection.QueryTypes.SELECT }
    );
    return auditorias;
  } catch (error) {
    console.error('Error obteniendo auditorías:', error);
    throw error;
  }
};

// Obtener auditoría por número de ticket
const obtenerAuditoriaPorTicket = async (No_Tick) => {
  try {
    const auditoria = await Connection.query(
      `
      SELECT t.No_Tick AS remision,
             t.Fecha_Vta AS fecha,
             c.Nombre_Cliente AS cliente,
             t.Tipo_Mov AS movimiento,
             t.Tipo_Vta AS tipo,
             t.Total_P AS total,
             t.Cancelado AS cx,
             t.Cortesia AS cort,
             t.MontoBono AS com,
             v.Nom_Vendedor AS vendedor,
             e.Empresa AS tienda,
             e.Direccion AS direccion_tienda
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

    if (!auditoria.length) return null;

    return {
      ...auditoria[0],
      productos: productos,
      importe: auditoria[0].total,
      descuento: 0.0,
      subtotal: auditoria[0].total,
      iva: 0.0,
      ieps: 0.0,
      total: auditoria[0].total,
      pago: auditoria[0].total,
      cambio: 0.0,
    };
  } catch (error) {
    console.error('Error obteniendo auditoría por ticket:', error);
    throw error;
  }
};

const obtenerAuditoriasFiltradas = async ({ movimiento, tipo, desde, hasta, cliente }) => {
  let query = `
    SELECT t.No_Tick AS remision,
           t.Fecha_Vta AS fecha,
           c.Nombre_Cliente AS cliente,
           t.Tipo_Mov AS movimiento,
           t.Tipo_Vta AS tipo,
           t.Total_P AS total,
           t.Cancelado AS cx,
           t.Cortesia AS cort,
           t.MontoBono AS com,
           v.Nom_Vendedor AS vendedor
    FROM Ticket t
    JOIN Clientes c ON t.Clav_Cliente = c.Clav_Cliente
    JOIN Vendedores v ON t.No_Vend = v.No_Vend
    WHERE t.Total_P IS NOT NULL
  `;

  const replacements = {};

  if (movimiento) {
    query += ' AND t.Tipo_Mov = :movimiento';
    replacements.movimiento = movimiento;
  }
  if (tipo) {
    query += ' AND t.Tipo_Vta = :tipo';
    replacements.tipo = tipo;
  }
  if (desde) {
    query += ' AND t.Fecha_Vta >= :desde';
    replacements.desde = desde;
  }
  if (hasta) {
    query += ' AND t.Fecha_Vta <= :hasta';
    replacements.hasta = hasta;
  }
  if (cliente) {
    query += ' AND c.Nombre_Cliente LIKE :cliente';
    replacements.cliente = `%${cliente}%`;
  }

  try {
    return await Connection.query(query, {
      type: Connection.QueryTypes.SELECT,
      replacements,
    });
  } catch (error) {
    console.error('Error obteniendo auditorías filtradas:', error);
    throw error;
  }
};

// Actualizar el estado de cancelación (CX) de una auditoría
const actualizarCX = async (No_Tick, cx) => {
  try {
    const [result] = await Connection.query(
      `
      UPDATE Ticket
      SET Cancelado = :cx
      WHERE No_Tick = :No_Tick
      `,
      {
        replacements: { No_Tick, cx },
        type: Connection.QueryTypes.UPDATE,
      }
    );
    return result; // Número de filas afectadas
  } catch (error) {
    console.error('Error al actualizar CX:', error);
    throw error;
  }
};

export default {
  obtenerTodasAuditorias,
  obtenerAuditoriaPorTicket,
  obtenerAuditoriasFiltradas,
  actualizarCX,
};
