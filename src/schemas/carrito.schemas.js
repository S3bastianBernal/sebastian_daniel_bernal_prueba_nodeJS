import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const Carrito = sequelize.define('carritos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 3,
    },
    id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

},{
    sequelize,
    modelName: 'carrito',
    tableName: 'carritos',
    timestamps: false
    
});

export default Carrito;