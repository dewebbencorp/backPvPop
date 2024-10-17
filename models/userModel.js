import { DataTypes } from 'sequelize';
import { conectarDB } from '../config/conexionDB.js';

const defineUser = async () => {
  const db = await conectarDB();
  return db.define(
    'User',
    {
      Clav_Usr: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      contrasenia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Super: {
        type: DataTypes.BOOLEAN,
      },
      VeImpvtas: {
        type: DataTypes.BOOLEAN,
      },
      Mega: {
        type: DataTypes.BOOLEAN,
      },
      Activo: {
        type: DataTypes.BOOLEAN,
      },
      No_Vend: {
        type: DataTypes.INTEGER,
      },
      PorcDV: {
        type: DataTypes.FLOAT,
      },
      ACambioPS: {
        type: DataTypes.BOOLEAN,
      },
      ActArticulos: {
        type: DataTypes.BOOLEAN,
      },
      AModCosto: {
        type: DataTypes.BOOLEAN,
      },
      AEdiAlmVend: {
        type: DataTypes.BOOLEAN,
      },
      AEdiCom: {
        type: DataTypes.BOOLEAN,
      },
      AutMProv: {
        type: DataTypes.BOOLEAN,
      },
      AutMFSFL: {
        type: DataTypes.BOOLEAN,
      },
      AutModVend: {
        type: DataTypes.BOOLEAN,
      },
      AutModAudit: {
        type: DataTypes.BOOLEAN,
      },
      ADescProductos: {
        type: DataTypes.BOOLEAN,
      },
      EntAlmacen: {
        type: DataTypes.BOOLEAN,
      },
      AccedeDepartamentos: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'Claves',
      timestamps: false,
      freezeTableName: true,
    }
  );
};

export default defineUser;
