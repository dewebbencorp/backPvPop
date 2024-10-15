import jwt from 'jsonwebtoken';
import ticketService from '../services/ticketService.js';

// Obtener detalles de un ticket específico por su número de ticket (No_Tick)
const obtenerTicketPorNumero = async (req, res) => {
  const token = req.cookies.token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Obtener el número del ticket desde los parámetros
    const { No_Tick } = req.params;

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
