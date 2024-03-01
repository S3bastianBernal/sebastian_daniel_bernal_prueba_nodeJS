import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const UserCliente = sequelize.define('users_clientes',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    identificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_direccion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users_direcciones',
            key: 'id'
        }
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'UserCliente',
    tableName: 'users_clientes',
    timestamps: false
})

export default UserCliente;