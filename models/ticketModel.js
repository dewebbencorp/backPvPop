import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const Ticket = Connection.define(
  'Ticket',
  {
    Clav_Alm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Clav_Empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    No_Tick: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Clav_Cliente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Fecha_Vta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Tipo_Mov: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Total_P: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    No_Vend: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Cancelado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Cortesia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    MontoBono: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: 'Ticket',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Ticket;
