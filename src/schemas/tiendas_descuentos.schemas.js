import { DataTypes } from 'sequelize';
import sequelize from "../database/sequelizeConfig.js";

const Tienda_Promocion = sequelize.define('tiendas_promociones', {
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_promocion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'TiendaPromocion',
        tableName: 'tiendas_promociones',
        timestamps: false
    })

export default Tienda_Promocion;