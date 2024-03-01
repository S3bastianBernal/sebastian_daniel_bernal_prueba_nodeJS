import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const PedidosEstados = sequelize.define('pedidos_estados', {
    estado: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    sequelize,
    modelName: 'PedidosEstados',
    tableName: 'pedidos_estados',
    timestamps: false
})

export default PedidosEstados;