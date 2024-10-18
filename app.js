import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.options.js';
import authMiddleware from './middlewares/authMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import salesRoutes from './routes/sales.routes.js';
import auditRoutes from './routes/audit.routes.js';
import { conectarDB } from './config/conexionDB.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

dotenv.config();

const App = {
  main: async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const HTTP_PORT = process.env.HTTP_PORT || 8080;

    // Configuración de CORS para permitir todos los orígenes
    app.use(cors({
      origin: ['http://localhost:8100','http://192.168.1.71:8100'], // Permitir todos los orígenes
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    }));

    // Log de solicitudes entrantes
    app.use((req, res, next) => {
      console.log(`Solicitado: ${req.method} ${req.url}`);
      next();
    });

    // Middlewares
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cookieParser());

    // Documentación de API con Swagger
    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

    // Rutas de autenticación y protegidas
    app.use('/api/auth', authRoutes);
    app.use('/api/ticket', ticketRoutes);
    app.use('/api/sales',  salesRoutes);
    app.use('/api/audit',  auditRoutes);

    // Ruta 404 para solicitudes desconocidas
    app.use((req, res) => res.status(404).json({ message: 'Request not found' }));

    // Middleware global para manejo de errores
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    });

    // Conectar a la base de datos
    await conectarDB();

    // Opciones HTTPS con certificados
    const httpsOptions = {
      key: fs.readFileSync('cert/server.key'),  // Ruta al archivo de clave privada
      cert: fs.readFileSync('cert/server.cert') // Ruta al archivo de certificado
    };

    // Iniciar el servidor HTTPS
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`Servidor HTTPS ejecutándose en https://localhost:${PORT}`);
    });

    // Iniciar servidor HTTP
    http.createServer(app).listen(HTTP_PORT, () => {
      console.log(`Servidor HTTP ejecutándose en http://localhost:${HTTP_PORT}`);
    });
  },
};

export default App;
