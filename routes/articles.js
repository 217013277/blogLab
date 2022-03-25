// This file will define the API route handlers for Articles
const Router = require('koa-router')
// We are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser')
const model = require('../models/articles')
const {validateArticle} = require('../controllers/validation')

// Since we are handling articles use a URI that begins with an appropriate path
const router = Router({prefix: '/api/v1/articles'})

// Temporarily define some random articles in an array.
// Later this will be removed and changed to come from the DB.
// let articles = [
//   {title:'hello article', fullText:'some text here to fill the body'},
//   {title:'another article', fullText:'again here is some text here to fill'},
//   {title:'coventry university ', fullText:'some news about coventry university'},
//   {title:'smart campus', fullText:'smart campus is coming to IVE'}
// ]

// Routes are needed to connect path endpoints to handler functions.
// When an Article id needs to be matched we use a pattern to match
// a named route parameter. Here the name of the parameter will be 'id'
// and we will define the pattern to match at least 1 numeral.

router.get('/', getAll)
router.get('/:id([0-9]{1,})',getById)
router.post('/', bodyParser(), validateArticle, createArticle)
router.put('/:id([0-9]{1,})', bodyParser(), validateArticle, updateArticle)
router.del('/:id([0-9]{1,})', validateArticle, deleteArticle)

//mongodb
router.post('/mongodb/', bodyParser(),createArticle)
router.get('/mongodb/:id([0-9]{1,})',getById)

// Now we define the handler functions used above.
async function getAll(ctx) {
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  }
}

async function getById(ctx) {
  let id = ctx.params.id
  let articles = await model.getById(id)
  if(articles.length){
    ctx.body = articles[0]
  } else {
    ctx.status = 404
    ctx.body = {description: 'Cannot not found the article id'}
  }
}

// The body parser gives us access to the request body on ctx.request.body.
  // articles.push(newArticle)
  // Finally send back appropriate JSON and status code.
  // Once we move to a DB store, the newArticle sent back will now have its ID.
  // ctx.status = 201
  // ctx.body = newArticle
async function createArticle(ctx) {
  console.log('start create article route')
  const body = ctx.request.body
  let articles = await model.add(body);
  if (articles) {
    ctx.body = articles //{ID: articles.insertId}
    ctx.status = 201
  }
}

async function updateArticle(ctx) {
  let id = ctx.params.id
  const body = ctx.request.body
  let articles = await model.updateById(id, body)
  if(articles){
    articles[id] = updateArticle
    ctx.status = 201
    ctx.body = articles
  } else {
    ctx.status = 404
    ctx.body = {description: 'Cannot not found the article id'}
  }
}

async function deleteArticle(ctx) {
  let id = ctx.params.id
  let articles = await model.deleteById(id)
  if(articles.length){
    ctx.status = 204
    ctx.body = articles
  } else {
    ctx.status = 404
    ctx.body = {description: 'Cannot not found the article id'}
  }
}

module.exports = router