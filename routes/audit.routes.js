import { Router } from 'express';
import auditController from '../controllers/auditController.js';

const router = Router();

/**
 * @swagger
 * /audit:
 *   get:
 *     summary: Obtener todas las auditorías
 *     description: Retorna una lista de todas las auditorías
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: Lista de auditorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   remision:
 *                     type: integer
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   cliente:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   total:
 *                     type: number
 *                   cx:
 *                     type: boolean
 *                   cort:
 *                     type: boolean
 *                   com:
 *                     type: number
 *                   vendedor:
 *                     type: string
 *       500:
 *         description: Error al obtener las auditorías
 */
router.get('/', auditController.obtenerAuditorias);

/**
 * @swagger
 * /audit/{No_Tick}:
 *   get:
 *     summary: Obtener detalles de auditoría con ticket específico
 *     description: Retorna los detalles de una auditoría junto con los tickets relacionados
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: No_Tick
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número del ticket para la auditoría
 *     responses:
 *       200:
 *         description: Detalles de auditoría con ticket obtenidos exitosamente
 *       404:
 *         description: Auditoría no encontrada
 *       500:
 *         description: Error al obtener la auditoría
 */
router.get('/:No_Tick', auditController.obtenerAuditoriaConTicket);

export default router;