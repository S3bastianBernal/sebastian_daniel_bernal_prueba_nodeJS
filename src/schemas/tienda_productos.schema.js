import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";


const Tienda_Productos = sequelize.define('tiendas_productos', {
    compra_maxima: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    id_promocion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TiendaProductos',
    tableName: 'tiendas_productos',
    timestamps: false
});


export default Tienda_Productos;