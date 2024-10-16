import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineEmpresa = async () => {
  const db = await conectarDB();
  return db.define(
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
};

export default defineEmpresa;
