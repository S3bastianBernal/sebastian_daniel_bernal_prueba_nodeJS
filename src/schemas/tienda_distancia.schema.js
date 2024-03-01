import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelizeConfig.js';

const TiendaDistancia = sequelize.define('tienda_distancias',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tienda:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    desde:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hasta:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'TiendaDistancia',
    tableName: 'tiendas_distancias',
    timestamps: false
})

export default TiendaDistancia;