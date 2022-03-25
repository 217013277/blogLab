const Router = require('koa-router')
const can = require('../permissions/users')
const model = require('../models/users')
const auth = require('../controllers/auth')

const router = Router({prefix: '/api/v1/users'})

router.get('/', auth, getUserAll)
router.get('/:id([0-9]{1,})', auth, getUser)

async function getUserAll(ctx) {
  const permission = can.readAll(ctx.state.user)
  if(!permission.granted) {
    ctx.status = 403
  } else {
    const result = await model.getAll()
    if(result.length) {
      ctx.body = result
    }
  }
}

async function getUser(ctx) {
  let id = ctx.params.id
  const permission = can.read(ctx.state.user, ctx)
  if(!permission.granted) {
    ctx.status = 403
  } else {
    const result = await model.getUser(id)
    if(result.length) {
      ctx.body = result
    }
  }
}

module.exports = router

//getUserAll
//getUser
//updateUser
//deleteUser