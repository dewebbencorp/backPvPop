import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const login = async (req, res) => {
  console.log("entre");
  
  const { Clav_Usr, contrasenia } = req.body;

  if (!Clav_Usr || !contrasenia) {
    return res.status(400).json({ message: 'Por favor, llena todos los campos.' });
  }

  try {
    const user = await User.findOne({ where: { Clav_Usr } });
    console.log("usuario", user)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.Activo) {
      return res.status(403).json({ message: 'El usuario no está activo' });
    }

    if (contrasenia !== user.contrasenia) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.Clav_Usr, permisos: user.permisos }, process.env.JWT_SECRET, { expiresIn: '2.5h' });

    

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 2.5 * 60 * 60 * 1000,
    });
    console.log("token", token)

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyToken = (req, res) => {
  try {
    res.status(200).json({
      message: 'Token válido',
      user: req.user,
    });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada correctamente.' });
};

export default {
  login,
  verifyToken,
  logout,
};
