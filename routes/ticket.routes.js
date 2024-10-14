import { Router } from 'express';
import ticketController from '../controllers/ticketController.js';

const router = Router();

/**
 * @swagger
 * /ticket/{No_Tick}:
 *   get:
 *     summary: Obtener detalles de un ticket específico
 *     description: Retorna los detalles de un ticket usando su número (No_Tick)
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: No_Tick
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número del ticket
 *     responses:
 *       200:
 *         description: Detalles del ticket obtenidos exitosamente
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error al obtener el ticket
 */
router.get('/:No_Tick', ticketController.obtenerTicketPorNumero);

export default router;
