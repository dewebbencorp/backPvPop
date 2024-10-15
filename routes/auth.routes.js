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
router.get('/verify-token', authMiddleware, authController.verifyToken);

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

<<<<<<< HEAD
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Obtener claves de usuarios
 *     description: Retorna una lista de claves de todos los usuarios
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de claves de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Clav_Usr:
 *                     type: string
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/users', authController.getUsers);
=======
>>>>>>> c1d4ec409e557b9b197e5f0d51cc14abc7e32617

export default router;
