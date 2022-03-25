//jshint esversion:6
const Koa = require('koa')
const cors = require('@koa/cors')
const homepage = require('./routes/homepage.js')
const specials = require('./routes/special.js')
const articles = require('./routes/articles.js')
const users = require('./routes/users.js')
const static = require('koa-static-router')


const app = new Koa()
let port = process.env.Port || 10888
app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})

app.use(homepage.routes())
app.use(specials.routes())
app.use(articles.routes())
app.use(users.routes())
app.use(static({dir:'docs', router:'./doc/'})) //static link: https://bloglab.217013277.repl.co/doc/blogapi.html


const options = {
  origins: '*'
}
app.use(cors())