import { QueryTypes } from 'sequelize';
import { sequelize } from '../database.js';

export async function queryOne(query, replacements = {}) {
  return sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
    plain: true,
  });
}

export async function queryAll(query, replacements = {}) {
  return sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });
}

export async function execute(query, replacements = {}) {
  return sequelize.query(query, {
    replacements,
  });
}
