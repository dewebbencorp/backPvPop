import auditService from '../services/auditService.js';
import { Connection } from '../config/conexionDB.js';

export const obtenerAuditorias = async (req, res) => {
  try {
    const auditorias = await auditService.obtenerTodasAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo auditorías: ' + error.message });
  }
};

export const obtenerAuditoriaConTicket = async (req, res) => {
  const { No_Tick } = req.params;

  try {
    const auditoria = await auditService.obtenerAuditoriaPorTicket(No_Tick);
    if (!auditoria) {
      return res.status(404).json({ error: 'Auditoría no encontrada' });
    }
    res.status(200).json(auditoria);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo auditoría con ticket: ' + error.message });
  }
};

export const obtenerAuditoriasFiltradas = async (req, res) => {
  const { movimiento, tipo, desde, hasta, cliente } = req.query;

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

  query += ' ORDER BY t.Fecha_Vta DESC';

  try {
    const auditorias = await Connection.query(query, {
      type: Connection.QueryTypes.SELECT,
      replacements,
    });
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo auditorías filtradas: ' + error.message });
  }
};


export const actualizarCX = async (req, res) => {
  const { No_Tick } = req.params;
  const { cx } = req.body;

  try {
    const result = await auditService.actualizarCX(No_Tick, cx);
    if (!result) {
      return res.status(404).json({ error: 'Auditoría no encontrada' });
    }
    res.status(200).json({ message: 'CX actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar CX: ' + error.message });
  }
};

export default {
  obtenerAuditorias,
  obtenerAuditoriaConTicket,
  obtenerAuditoriasFiltradas,
  actualizarCX
};
