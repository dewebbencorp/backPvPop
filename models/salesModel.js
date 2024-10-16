import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineVenta = async () => {
  const db = await conectarDB();
  return db.define(
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
};

export default defineVenta;
