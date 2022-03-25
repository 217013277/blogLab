const {Sequelize, QueryTypes} = require('sequelize') 
const info = require('../config')

// define an async utility function to get a connection
// run an SQL query then end the connection

// const config = info.myElephantConfig

const url = `postgres://${info.myElephantConfig.user}:${info.myElephantConfig.password}@${info.myElephantConfig.host}:${info.myElephantConfig.port}/${info.myElephantConfig.database}`

exports.run_query = async function run_query(query, values ="") { 
  try {
    const sequelize = new Sequelize(url)
    await sequelize.authenticate()
    const data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, query, values);
    throw 'Database query error'
  }
}

exports.run_insert = async function run_insert(query, values) { 
  console.log('start create article helper')
  try {
    const sequelize = new Sequelize(url)
    await sequelize.authenticate()
    let data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, query, values);
    throw 'Database query error'
  } 
}

exports.run_update = async function run_update(query, values) { 
  try {
    const sequelize = new Sequelize(url)
    await sequelize.authenticate()
    let data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.UPDATE
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, query, values);
    throw 'Database query error'
  }
}

exports.run_delete = async function run_delete(query, values) { 
  try {
    const sequelize = new Sequelize(url)
    await sequelize.authenticate()
    let data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.DELETE
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, query, values);
    throw 'Database query error'
  }
}

