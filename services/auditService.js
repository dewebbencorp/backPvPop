import { Connection } from '../config/conexionDB.js';

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
    return result; // Retorna el número de filas afectadas
  } catch (error) {
    console.error('Error al actualizar CX:', error);
    throw error;
  }
};

export default {
  obtenerTodasAuditorias,
  obtenerAuditoriaPorTicket,
  obtenerAuditoriasFiltradas: async (filters) => {
    // Pasar filtros opcionales y construir consulta
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
    if (filters.movimiento) query += ' AND t.Tipo_Mov = :movimiento';
    if (filters.tipo) query += ' AND t.Tipo_Vta = :tipo';
    if (filters.desde) query += ' AND t.Fecha_Vta >= :desde';
    if (filters.hasta) query += ' AND t.Fecha_Vta <= :hasta';
    if (filters.cliente) query += ' AND c.Nombre_Cliente LIKE :cliente';
    query += ' ORDER BY t.Fecha_Vta DESC';

    return Connection.query(query, { type: Connection.QueryTypes.SELECT, replacements });
  },
  actualizarCX,
};
