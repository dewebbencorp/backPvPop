import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB2.js';

const CatArticulos = Connection.define('Cat_Articulos', {
  Clav_Art: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  Desc_Art: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Precio1: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  Precio2: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  Confoto: {
    type: DataTypes.STRING(1),
    defaultValue: 'N',
  },
  FotoArt: {
    type: DataTypes.BLOB('long'),
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  servicio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Cat_Articulos',
  timestamps: false,
});

export default CatArticulos;