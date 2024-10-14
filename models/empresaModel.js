import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const Empresa = Connection.define(
  'Empresa',
  {
    Clav_Empresa: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Empresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Empresas',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Empresa;
