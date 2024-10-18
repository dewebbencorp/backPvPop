import { Router } from 'express';
import ticketController from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Middleware de autenticación

const router = Router();

/**
 * @swagger
 * /api/ticket/{No_Tick}:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 remision:
 *                   type: integer
 *                 fecha:
 *                   type: string
 *                   format: date
 *                 cliente:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 total:
 *                   type: number
 *                 cx:
 *                   type: boolean
 *                 cort:
 *                   type: boolean
 *                 com:
 *                   type: number
 *                 vendedor:
 *                   type: string
 *                 tienda:
 *                   type: string
 *                 direccion_tienda:
 *                   type: string
 *                 cajero:
 *                   type: string
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       descripcion:
 *                         type: string
 *                       cantidad:
 *                         type: number
 *                       precio_unitario:
 *                         type: number
 *                       total:
 *                         type: number
 *       401:
 *         description: Acceso no autorizado, token inválido
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error al obtener el ticket
 */
router.get('/:No_Tick', ticketController.obtenerTicketPorNumero); // Usar el middleware de autenticación

export default router;
