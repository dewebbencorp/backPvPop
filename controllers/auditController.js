import auditService from '../services/auditService.js';

const obtenerAuditorias = async (req, res) => {
  try {
    const auditorias = await auditService.obtenerTodasAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo auditorías: ' + error.message });
  }
};

const obtenerAuditoriaConTicket = async (req, res) => {
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

const obtenerAuditoriasFiltradas = async (req, res) => {
  const { movimiento, tipo, desde, hasta, cliente } = req.query;

  try {
    const auditorias = await auditService.obtenerAuditoriasFiltradas({ movimiento, tipo, desde, hasta, cliente });
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo auditorías filtradas: ' + error.message });
  }
};

const actualizarCX = async (req, res) => {
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
  actualizarCX,
};
