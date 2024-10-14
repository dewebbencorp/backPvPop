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
 * /audit/filtro:
 *   get:
 *     summary: Obtener auditorías filtradas
 *     description: Retorna una lista de auditorías aplicando filtros opcionales.
 *     tags: [Audit]
 *     parameters:
 *       - in: query
 *         name: movimiento
 *         schema:
 *           type: string
 *         required: false
 *         description: Tipo de movimiento de la auditoría.
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         required: false
 *         description: Tipo de venta de la auditoría.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de inicio para filtrar las auditorías.
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de fin para filtrar las auditorías.
 *       - in: query
 *         name: cliente
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del cliente para filtrar las auditorías.
 *     responses:
 *       200:
 *         description: Lista de auditorías filtrada obtenida exitosamente.
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
 *                   movimiento:
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
 *         description: Error al obtener las auditorías filtradas
 */
router.get('/filtro', auditController.obtenerAuditoriasFiltradas);

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

/**
 * @swagger
 * /audit/{No_Tick}/cx:
 *   patch:
 *     summary: Actualizar el estado de cancelación (CX) de una auditoría
 *     description: Activa o desactiva el campo CX de una auditoría específica según el número de ticket.
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: No_Tick
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número del ticket para la auditoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cx:
 *                 type: boolean
 *                 description: Estado de cancelación (true para activado, false para desactivado)
 *     responses:
 *       200:
 *         description: Campo CX actualizado correctamente
 *       404:
 *         description: Auditoría no encontrada
 *       400:
 *         description: Solicitud incorrecta. Parámetros no válidos.
 *       500:
 *         description: Error al actualizar el campo CX
 */
router.patch('/:No_Tick/cx', auditController.actualizarCX);

export default router;
