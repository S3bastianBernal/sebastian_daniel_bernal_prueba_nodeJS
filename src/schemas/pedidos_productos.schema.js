import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const PedidoProducto = sequelize.define('pedidos_productos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 2.000
    },
    valor_unitario:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valor_unitario_promocion:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_teorico:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_final:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    id_promocion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pedido:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'pedidos',
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'PedidoProducto',
    tableName: 'pedidos_productos',
    timestamps: false
})

export default PedidoProducto;