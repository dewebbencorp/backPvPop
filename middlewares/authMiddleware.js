import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
<<<<<<< HEAD
  const token = req.cookies.token;  // Obteniendo el token de las cookies
=======
  const token = req.cookies.token;
>>>>>>> c1d4ec409e557b9b197e5f0d51cc14abc7e32617

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

export default authMiddleware;
