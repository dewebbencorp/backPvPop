import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

// Definición del modelo Ventas usando Sequelize
export const Venta = Connection.define(
  'Venta',
  {
    articulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.DECIMAL,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'Ventas',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Venta;
