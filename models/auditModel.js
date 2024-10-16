import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineAuditoria = async () => {
  const db = await conectarDB();
  return db.define(
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
};

export default defineAuditoria;
