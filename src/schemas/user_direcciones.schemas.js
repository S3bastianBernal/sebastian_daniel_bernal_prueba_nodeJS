import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const UserDireccion = sequelize.define('users_direcciones',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distancia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'UserDireccion',
    tableName: 'users_direcciones',
    timestamps: false
})

export default UserDireccion;