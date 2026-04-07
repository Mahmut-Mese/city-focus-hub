import { QueryTypes } from 'sequelize';
import { sequelize } from '../database.js';

export async function queryOne(query, replacements = {}, options = {}) {
  return sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
    plain: true,
    ...(options.transaction ? { transaction: options.transaction } : {}),
  });
}

export async function queryAll(query, replacements = {}, options = {}) {
  return sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
    ...(options.transaction ? { transaction: options.transaction } : {}),
  });
}

export async function execute(query, replacements = {}, options = {}) {
  return sequelize.query(query, {
    replacements,
    ...(options.transaction ? { transaction: options.transaction } : {}),
  });
}
