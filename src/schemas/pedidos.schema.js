import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const Pedidos = sequelize.define('pedidos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    instrucciones:{
        type: DataTypes.STRING(500),
        allowNull: true
    },
    entrega_fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor_productos:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valor_envio:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valor_descuento:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valor_cupon:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0000
    },
    impuestos:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    valor_impuestos:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0000
    },
    valor_final:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0000
    },
    id_tienda:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tiendas',
            key: 'id'
        }
    },
    direccion:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    valor_comision:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0000
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    sequelize,
    modelName: 'Pedidos',
    tableName: 'pedidos',
    timestamps: false
});

export default Pedidos;