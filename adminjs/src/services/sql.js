import { QueryTypes } from 'sequelize';
import { sequelize } from '../database.js';

export async function queryOne(query, replacements = {}, options = {}) {
  try {
    return await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
      plain: true,
      ...(options.transaction ? { transaction: options.transaction } : {}),
    });
  } catch (error) {
    console.error('[sql.queryOne] Query failed:', String(error?.message ?? error), { query: query.slice(0, 120) });
    throw error;
  }
}

export async function queryAll(query, replacements = {}, options = {}) {
  try {
    return await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
      ...(options.transaction ? { transaction: options.transaction } : {}),
    });
  } catch (error) {
    console.error('[sql.queryAll] Query failed:', String(error?.message ?? error), { query: query.slice(0, 120) });
    throw error;
  }
}

export async function execute(query, replacements = {}, options = {}) {
  try {
    return await sequelize.query(query, {
      replacements,
      ...(options.transaction ? { transaction: options.transaction } : {}),
    });
  } catch (error) {
    console.error('[sql.execute] Query failed:', String(error?.message ?? error), { query: query.slice(0, 120) });
    throw error;
  }
}
