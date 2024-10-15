import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const Cliente = Connection.define(
  'Cliente',
  {
    Clav_Cliente: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Nombre_Cliente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Clientes',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Cliente;
