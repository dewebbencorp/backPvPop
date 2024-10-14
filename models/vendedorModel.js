import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const Vendedor = Connection.define(
  'Vendedor',
  {
    No_Vend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nom_Vendedor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Vendedores',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Vendedor;
