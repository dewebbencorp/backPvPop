import { Router } from 'express';
import ticketController from '../controllers/ticketController.js';
const router = Router();

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Obtener todos los tickets
 *     description: Obtiene una lista de todos los tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida correctamente
 *       500:
 *         description: Error al obtener los tickets
 */
router.get('/', ticketController.getTickets);

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Crear un nuevo ticket
 *     description: Crea un nuevo ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Clav_Alm:
 *                 type: string
 *               Clav_Empresa:
 *                 type: string
 *               No_Tick:
 *                 type: integer
 *               Total_P:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ticket creado exitosamente
 *       500:
 *         description: Error al crear el ticket
 */
router.post('/', ticketController.createTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Actualizar un ticket existente
 *     description: Actualiza un ticket existente por ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Total_P:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ticket actualizado exitosamente
 *       500:
 *         description: Error al actualizar el ticket
 */
router.put('/:id', ticketController.updateTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Eliminar un ticket existente
 *     description: Elimina un ticket por ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ticket
 *     responses:
 *       200:
 *         description: Ticket eliminado exitosamente
 *       500:
 *         description: Error al eliminar el ticket
 */
router.delete('/:id', ticketController.deleteTicket);

export default router;
