import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineCliente = async () => {
  const db = await conectarDB();
  return db.define(
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
};

export default defineCliente;
