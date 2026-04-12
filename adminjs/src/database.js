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
    // Set SQL_LOGGING=true in .env to enable query logging for debugging
    logging: process.env.SQL_LOGGING === 'true' ? console.log : false,
    timezone: '+00:00',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 30_000,
      idle: 10_000,
    },
  },
);
