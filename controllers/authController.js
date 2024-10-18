import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import defineUser from '../models/userModel.js';

const generarToken = (userId, permisos) => {
  return jwt.sign({ id: userId, permisos }, process.env.JWT_SECRET, { expiresIn: '2.5h' });
};

const login = async (req, res) => {
  
  const { Clav_Usr, contrasenia } = req.body;

  if (!Clav_Usr || !contrasenia) {
    return res.status(400).json({ message: 'Por favor, llena todos los campos.' });
  }

  try {
    const User = await defineUser();

    const user = await User.findOne({ where: { Clav_Usr } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.Activo) {
      return res.status(403).json({ message: 'El usuario no está activo' });
    }

    if (contrasenia !== user.contrasenia) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generarToken(user.Clav_Usr, user.permisos);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 2.5 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      login: true,
      token,
      mensaje: "Usuario logueado correctamente",
    });

  } catch (error) {
    console.error('Error en el controlador login:', error.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyToken = (req, res) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido o expirado' });
    }
    res.status(200).json({
      message: 'Token válido',
      user: decoded,
    });
  });
};

const logout = (req, res) => {
  res.clearCookie('token'); // Borra la cookie del token
  res.status(200).json({ message: "Logout exitoso" }); // Envía una respuesta exitosa
};

const confirmarAutorizacion = async (req, res) => {
  const { Clav_Usr, contrasenia } = req.body;

  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Verificar el token y extraer las credenciales del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Comparar el usuario y la contraseña del token con los ingresados
    if (Clav_Usr !== decoded.id || contrasenia !== decoded.contrasenia) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales coinciden, la autorización es exitosa
    res.status(200).json({ message: 'Autorización exitosa' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor o token inválido' });
  }
};
export default {
  login,
  verifyToken,
  logout,
  confirmarAutorizacion
};
