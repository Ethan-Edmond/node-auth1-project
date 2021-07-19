const db = require("../../data/db-config");

function find() {
  return db('users')
    .select("user_id", "username");
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db('users')
    .select("user_id", "username")
    .where(filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return "findById wired";
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  return "add wired";
}

module.exports = {
  find,
  findBy,
  findById,
  add
};
