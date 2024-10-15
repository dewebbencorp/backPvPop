import { DataTypes } from 'sequelize';
import { Connection } from '../config/conexionDB.js';

export const Auditoria = Connection.define(
  'Auditoria',
  {
    Clav_Cliente: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'Clav_Cliente'
      }
    },
    No_Vend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vendedores',
        key: 'No_Vend'
      }
    },
    Clav_Empresa: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Empresas',
        key: 'Clav_Empresa'
      }
    },
    No_Tick: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ticket',
        key: 'No_Tick'
      }
    },
    Fecha_Vta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }
  },
  {
    tableName: 'Auditoria',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Auditoria;
