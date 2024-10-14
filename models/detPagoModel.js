import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const DetPago = Connection.define(
  'DetPago',
  {
    Consec: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    },
    Clav_FP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Tipo_C: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Monto_P: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    MontoUSD: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Monto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Referencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Ref: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    No_Vend: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TVend: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Det_Pagos',
    timestamps: false,
    freezeTableName: true,
  }
);

export default DetPago;
