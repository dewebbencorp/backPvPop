import { Router } from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /api/auth/verify-token:
 *   get:
 *     summary: Verificar la validez del token
 *     description: Verifica si el token JWT es válido o ha expirado.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: El token es válido.
 *       401:
 *         description: El token no es válido o ha expirado.
 */
router.get('/verify-token',  authController.verifyToken);

/**
 * @swagger
 * /api/auth/login:
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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Elimina el token JWT y cierra la sesión del usuario.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 */
router.post('/logout', authController.logout);  // Manejamos el logout desde el controlador
/**
 * @swagger
 * /api/auth/confirm-auth:
 *   post:
 *     summary: Confirmar autorización de cierre de venta
 *     description: Verifica si las credenciales del usuario son correctas para autorizar el cierre de la venta.
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
 *         description: Autorización exitosa.
 *       401:
 *         description: Contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post('/confirm-auth', authController.confirmarAutorizacion);


export default router;
