import { Sequelize } from "sequelize";
import config from './config.js'

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql' 
});

// comprobar que la conexion de sequelize este funcioando correctamente
/* const authenticate = async(req,res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
} */

export default sequelize;
