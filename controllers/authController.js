import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const login = async (req, res) => {
  const { CClave, CPassword, txtEmpresa, txtAlmacen } = req.body;

  if (!CClave || !CPassword || !txtEmpresa || !txtAlmacen) {
    return res.status(400).json({ message: 'Por favor, llena todos los campos.' });
  }

  try {
    const user = await User.findOne({ where: { Clav_Usr: CClave } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.Activo !== true) {
      return res.status(403).json({ message: 'El usuario no está activo' });
    }

    const validPassword = await bcrypt.compare(CPassword, user.contrasenia);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const permisos = {
      SuperUsr: user.Super === true,
      GlbMega: user.Mega === true,
      GlbVeImpvtas: user.VeImpvtas === true,
      GlbACambioPS: user.ACambioPS === true,
      GlbModUC: user.AModCosto === true,
      GlbAEdiAlmVend: user.AEdiAlmVend === true,
      GlbAEditaCom: user.AEdiCom === true,
      GlbModFams: user.AutMFSFL === true,
      GlbModProvs: user.AutMProv === true,
      GlbModVend: user.AutModVend === true,
      GlbModAuditor: user.AutModAudit === true,
      GlbADescProductos: user.ADescProductos === true,
      GlbEntAlmacen: user.EntAlmacen === true,
      GlbAccedeDepartamentos: user.AccedeDepartamentos === true,
      GlbClave: CClave,
      GlbNumero: user.No_Vend || 1,
      GlbActiva: user.ActArticulos,
    };

    // Crear un token JWT
    const token = jwt.sign({ id: user.Clav_Usr, permisos }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      permisos,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export default {
  login,
};
