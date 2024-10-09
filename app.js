import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Rutas
import authRoutes from './routes/auth.routes.js';
import ticketsRoute from './routes/tickets.routes.js';
import salesRoutes from './routes/sales.routes.js';

// Base de datos
import { connectDB } from './config/conexionDB.js';

// Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.options.js';

dotenv.config();

const App = {
  main: async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    // Swagger
    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

    // Rutas
    app.use('/api/auth', authRoutes);
    app.use('/api/tickets', ticketsRoute);
    app.use('/api/sales', salesRoutes);

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