import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";


const Producto = sequelize.define('producto', {
    estado: {
      type: DataTypes.BOOLEAN
    },
    kit: {
      type: DataTypes.BOOLEAN
    },
    barcode: {
      type: DataTypes.STRING,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 60]
      }
    },
    presentacion: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 25]
      }
    },
    descripcion: {
      type: DataTypes.STRING
    },
    foto: {
      type: DataTypes.STRING
    },
    peso: {
      type: DataTypes.FLOAT
    }
  },{
    sequelize,
    modelName: 'producto',
    tableName: 'productos',
    timestamps: false
  });

export default Producto;