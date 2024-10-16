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
import https from 'https'
import fs from 'fs'
dotenv.config();
const options = {
    key:fs.readFileSync('cert/server.key'),
    cert:fs.readFileSync('cert/server.cert')
}
const App = {
  main: async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configuración de CORS y métodos permitidos
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
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
    app.use('/api/ticket', authMiddleware, ticketRoutes);
    app.use('/api/sales', authMiddleware, salesRoutes);
    app.use('/api/audit', authMiddleware, auditRoutes);

    // Ruta 404 para solicitudes desconocidas
    app.use((req, res) => res.status(404).json({ message: 'Request not found' }));

    // Middleware global para manejo de errores
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    });

    // Conectar a la base de datos y arrancar el servidor
    await conectarDB();
    https.createServer(options , app).listen(3000,()=>{
        console.log('Servidor HTTPS corriendo en https://localhost:3000');
    })
   /* app.listen(PORT, () => {
      console.log(`[API] Ejecutando en http://localhost:${PORT}`);
    });*/
  },
};

export default App;
