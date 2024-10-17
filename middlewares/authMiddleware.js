import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  console.log("Token recibido:", token); // Log para verificar el token

  if (!token) {
      console.log("Token no proporcionado");
      return res.status(401).json({ message: 'Acceso denegado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          console.log("Error de verificación del token:", err.message);
          return res.status(403).json({ message: 'Token no válido' });
      }

      req.user = user;
      next();
  });
};



export default authMiddleware;
