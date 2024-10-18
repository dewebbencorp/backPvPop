import { Router } from 'express';
import salesController from '../controllers/salesController.js';

const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     description: Retorna una lista de todas las ventas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 */
router.get('/', salesController.obtenerVentas);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Agregar una nueva venta
 *     description: Agrega una nueva venta al sistema
 *     tags: [Sales]
 */
router.post('/', salesController.agregarVenta);

/**
 * @swagger
 * /api/sales/articulo/{clave}:
 *   get:
 *     summary: Buscar artículo por clave
 *     description: Retorna un artículo específico según su clave, almacén y empresa.
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: clave
 *         required: true
 *         description: La clave del artículo.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artículo encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clave:
 *                   type: string
 *                   description: Clave del artículo.
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del artículo.
 *                 stock:
 *                   type: number
 *                   description: Existencia del artículo.
 *                 precio:
 *                   type: number
 *                   description: Precio del artículo.
 *                 foto:
 *                   type: string
 *                   description: Indica si el artículo tiene foto (S/N).
 *       404:
 *         description: Artículo no encontrado.
 *       500:
 *         description: Error al buscar el artículo.
 */

router.get('/articulo/:clave', salesController.buscarArticulo);

export default router;