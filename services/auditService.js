import { conectarDB, cerrarDB } from '../config/conexionDB.js';

const obtenerTodasAuditorias = async () => {
  try {
    const db = await conectarDB();
    const auditorias = await db.query(
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
      { type: db.QueryTypes.SELECT }
    );
    return auditorias;
  } catch (error) {
    console.error('Error obteniendo auditorías:', error);
    throw error;
  } finally {
    await cerrarDB();
  }
};

// Otros métodos similares con ajustes para conectar y cerrar la conexión

const obtenerAuditoriaPorTicket = async (No_Tick) => {
  try {
    const db = await conectarDB();
    const auditoria = await db.query(
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
        type: db.QueryTypes.SELECT,
        replacements: { No_Tick },
      }
    );

    const productos = await db.query(
      `
      SELECT dt.Desc_Art AS descripcion, 
             dt.Cant AS cantidad, 
             dt.PrecioU AS precio_unitario, 
             dt.Total_P AS total
      FROM Det_Ticket dt
      WHERE dt.No_Tick = :No_Tick
      `,
      {
        type: db.QueryTypes.SELECT,
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
  } finally {
    await cerrarDB();
  }
};

export default {
  obtenerTodasAuditorias,
  obtenerAuditoriaPorTicket,
  // Otros métodos exportados aquí
};
