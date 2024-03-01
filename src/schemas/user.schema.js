import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const User = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    login:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    codigo_temporal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
    
});

export default User;