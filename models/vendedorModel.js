import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineVendedor = async () => {
  const db = await conectarDB();
  return db.define(
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
};

export default defineVendedor;
