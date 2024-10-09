import { Router } from 'express';
import salesController from '../controllers/salesController.js'; 

const router = Router();

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     description: Retorna una lista de todas las ventas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   producto:
 *                     type: string
 *                   cantidad:
 *                     type: integer
 *                   total:
 *                     type: number
 *       500:
 *         description: Error al obtener las ventas
 */
router.get('/', salesController.obtenerVentas);

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Agregar una nueva venta
 *     description: Agrega una nueva venta al sistema
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venta agregada exitosamente
 *       500:
 *         description: Error al agregar la venta
 */
router.post('/', salesController.agregarVenta);

export default router;
