const db = require('../../data/db-config');

function find() {
  return db('users')
    .select('user_id', 'username');
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db('users')
    .select('user_id', 'username')
    .where(filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return 'findById wired';
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const user_id = await db('users').insert(user);
  return await db('users')
    .select('user_id', 'username')
    .where({user_id})
    .first();
}

module.exports = {
  find,
  findBy,
  findById,
  add
};
