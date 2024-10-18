import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB2.js';
import CatArticulos from './catArticulosModel.js'; // Importamos el modelo de Cat_Articulos

const Productos = Connection.define('Productos', {
  Clav_Alm: {
    type: DataTypes.STRING(5),
    allowNull: false,
    primaryKey: true,
  },
  Clav_Empresa: {
    type: DataTypes.STRING(5),
    allowNull: false,
    primaryKey: true,
  },
  Clav_Art: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  Exist: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  Precio1: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  Precio2: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  servicio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  Anaquel: {
    type: DataTypes.STRING(6),
  },
  Piso: {
    type: DataTypes.STRING(2),
  },
  Lugar: {
    type: DataTypes.STRING(3),
  },
}, {
  tableName: 'Productos',
  timestamps: false,
});

Productos.belongsTo(CatArticulos, {
  foreignKey: 'Clav_Art',
  targetKey: 'Clav_Art',
  onUpdate: 'CASCADE',
  onDelete: 'NO ACTION',
});

export default Productos;