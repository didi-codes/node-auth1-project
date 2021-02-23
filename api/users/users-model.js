const db = require('../../database/connection');

module.exports = {
  get,
  getBy,
  getById,
  create,
};

function get() {
  return db('users').select('id', 'username').orderBy('id');
}

function getBy(filter) {
  return ab('users').where(filter).orderBy('id');
}

async function create(user) {
  const [id] = await db('users').insert(user, 'id');
  return getById(id);
}

function getById(id) {
  return db('users').where({ id }).first();
}
