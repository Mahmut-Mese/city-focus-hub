import { Sequelize } from 'sequelize';
import { config } from './config.js';

export const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
);
