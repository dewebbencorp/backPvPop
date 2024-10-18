import ticketService from '../services/ticketService.js';

// Obtener detalles de un ticket específico por su número de ticket (No_Tick)
const obtenerTicketPorNumero = async (req, res) => {
  // Obtener el número del ticket desde los parámetros
  const { No_Tick } = req.params;

  try {
    // Obtener los detalles del ticket desde el servicio
    const ticket = await ticketService.obtenerTicketPorNumero(No_Tick);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }

    // Responder con los datos del ticket
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: `Error obteniendo el ticket: ${error.message}` });
  }
};

export default {
  obtenerTicketPorNumero,
};
