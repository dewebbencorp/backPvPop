import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authMiddleware from './middlewares/authMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import salesRoutes from './routes/sales.routes.js';
import auditRoutes from './routes/audit.routes.js';

// Base de datos
import { connectDB } from './config/conexionDB.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.options.js';

dotenv.config();

const App = {
  main: async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configurar CORS y cookies
    app.use(cors({
      origin: 'http://localhost:5173',  // Cambia esto por el origen de tu frontend
      credentials: true,  // Permitir el envío de cookies y credenciales
    }));

    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cookieParser());  // Usar cookie-parser

    // Swagger
    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

    // Rutas sin autenticación
    app.use('/api/auth', authRoutes);

    // Rutas protegidas por autenticación
    app.use('/api/ticket', authMiddleware, ticketRoutes);
    app.use('/api/sales', authMiddleware, salesRoutes);
    app.use('/api/audit', authMiddleware, auditRoutes);

    app.use('/', (req, res) => {
      res.status(404).json({ message: 'Request not found' });
    });

    // Conectar a la base de datos
    async function connectDatabase() {
      try {
        await connectDB();
        console.log('[OK] Conexión establecida con la base de datos');
      } catch (error) {
        console.error('[ERROR] No se pudo conectar con la base de datos', error);
      }
    }

    // Middleware para manejo de errores
    function handleError(err, req, res, next) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }

    app.use(handleError);

    // Iniciar el servidor
    // Iniciar el servidor
    async function startServer() {
      await connectDatabase();
      app.listen(PORT, () => {
        console.log(`[API] se ejecuta en http://localhost:${PORT}`);
      });
    }

    startServer();
  },
};

export default App;

