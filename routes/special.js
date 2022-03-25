const Router = require('koa-router')
// const bodyParser = require('koa-bodyparser')
const auth = require('../controllers/auth')

const router = Router({prefix: '/api/v1'})

router.get('/', publicAPI)
router.get('/private', auth, privateAPI)

function publicAPI(ctx) {
  ctx.body = {
    message: 'API V1 Public page'
  }
}

function privateAPI(ctx) {
  const user = ctx.state.user
  ctx.body = {
    message: `hello ${user.username}`
  }
}

module.exports = router