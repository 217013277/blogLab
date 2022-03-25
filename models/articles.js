//jshint esversion:6

const db = require('../helper/postgresDB')
const dbMongo = require('../helper/mongodb')

//list all the articles in the database
exports.getAll = async function getAll (page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM articles;"
  let data = await db.run_query(query) 
  return data
}

//get a single article by its id
exports.getById = async function getById(id) {
  let query = "select * from articles where id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//create a new article in the database 
exports.add = async function add(article) {
  console.log('start create article models')
  //get the keys from data
  let keys = Object.keys(article)
  //join the keys with comma: ','
  keys = keys.join(',')
  //get the values from data
  let values = Object.values(article)
  //declare empty string for next line to join data
  let parm = ''
  //join '?,' into the empty string times values length
  for(i=0; i<values.length; i++) {parm +='?,'}
  //remove the last comma
  parm=parm.slice(0,-1)
  let query = `INSERT INTO articles (${keys}) VALUES (${parm}) RETURNING *`
  try{
    let data = await db.run_insert(query, values)
    return data
  } catch(error) {
    return error
  }
}

//update a single article by its id
exports.updateById = async function updateById(id, article) {
  let keys = Object.keys(article)
  let names = Object.values(article)
  let objects = ''
  for(i=0; i<keys.length;i++) {
    objects += `${keys[i]} = '${names[i]}',`
  }
  objects=objects.slice(0,-1)
  let query = `UPDATE articles SET ${objects} where id = ?`
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.deleteById = async function deletebyId(id, article){
  let query = "DELETE FROM articles WHERE id = ? RETURNING *"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//MongoDB
exports.getByIDMongo = async function getByIdMongo(id) {
  let data = await dbMongodb.runquery('articles',{'authorID': parseInt(id)})
  return data
}

exports.addMongo = async function addMongo(document) {
  let status = await dbMongo.run_insert('articles', documnet)
  return status
}