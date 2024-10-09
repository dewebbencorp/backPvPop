import { Router } from 'express';
import authController from '../controllers/authController.js';
const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autenticación de usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Clav_Usr
 *               - contrasenia
 *             properties:
 *               Clav_Usr:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *       401:
 *         description: Contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post('/login', authController.login);

export default router;
