import ticketService from '../services/ticketService.js';

export const obtenerTicketPorNumero = async (req, res) => {
  const { No_Tick } = req.params;

  try {
    const ticket = await ticketService.obtenerTicketPorNumero(No_Tick);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el ticket: ' + error.message });
  }
};

export default {
  obtenerTicketPorNumero,
};
