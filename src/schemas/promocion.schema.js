import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelizeConfig.js';

const Promocion = sequelize.define('promociones', {
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porcentaje: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dias_semana: {
        type: DataTypes.STRING(21),
        allowNull: false,
        defaultValue: "[0,0,0,0,0,0,0]" 
    }
},{
    sequelize,
    modelName: 'Promocion',
    tableName: 'promociones',
    timestamps: false
});

export default Promocion;