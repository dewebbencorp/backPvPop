import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineDetTicket = async () => {
  const db = await conectarDB();
  return db.define(
    'DetTicket',
    {
      Consec: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      No_Tick: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Clav_Art: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Desc_Art: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Cant: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      PrecioU_P: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      Total_P: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    {
      tableName: 'Det_Ticket',
      timestamps: false,
      freezeTableName: true,
    }
  );
};

export default defineDetTicket;
