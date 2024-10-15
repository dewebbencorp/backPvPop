import { Router } from 'express';
import auditController from '../controllers/auditController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /api/audit:
 *   get:
 *     summary: Obtener todas las auditorías
 *     description: Retorna una lista de todas las auditorías
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: Lista de auditorías obtenida exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/', authMiddleware, auditController.obtenerAuditorias);

/**
 * @swagger
 * /api/audit/filtro:
 *   get:
 *     summary: Obtener auditorías filtradas
 *     description: Retorna una lista de auditorías aplicando filtros opcionales
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: Lista de auditorías filtrada obtenida exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/filtro', authMiddleware, auditController.obtenerAuditoriasFiltradas);

/**
 * @swagger
 * /api/audit/{No_Tick}:
 *   get:
 *     summary: Obtener auditoría por número de ticket
 *     description: Retorna una auditoría específica según el número de ticket
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: No_Tick
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de ticket de la auditoría
 *     responses:
 *       200:
 *         description: Auditoría obtenida exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/:No_Tick', authMiddleware, auditController.obtenerAuditoriaConTicket);

/**
 * @swagger
 * /api/audit/{No_Tick}/cx:
 *   patch:
 *     summary: Actualizar estado de cancelación (CX) de una auditoría
 *     description: Actualiza el estado de cancelación de una auditoría específica
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: No_Tick
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de ticket de la auditoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cx:
 *                 type: boolean
 *                 description: Estado de cancelación
 *     responses:
 *       200:
 *         description: Estado de cancelación actualizado exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.patch('/:No_Tick/cx', authMiddleware, auditController.actualizarCX);

export default router;
