const db = require('../helper/postgresDB')

//getUserByUsername
exports.getUserByUsername = async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?"
  let values = [username]
  const data = await db.run_query(query, values)
  return data
}

//getUserById
exports.getUserById = async function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = ?"
  let values = [id]
  const data = await db.run_query(query, values)
  return data
}

//getUserAll
exports.getUserAll = async function getUserAll() {
  let query = "SELECT * FROM users"
  let data = await db.run_query(query)
  return data
}

//updateUser
exports.updateUser = async function updateUser(UserId, userInfo) {
  let id = [UserId]
  let keys = Object.keys(userInfo)
  let values = Object.values(userInfo)
  let objects = ''
  for(i=0; i<keys.length;i++) {
    objects += `${keys[i]} = '${values[i]}',`
  }
  objects=objects.slice(0,-1)
  let query = `UPDATE users SET ${objects} where id = ?`
  let data = await db.run_query(query, id)
  return data
}

//deleteUser