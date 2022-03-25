const Router = require('koa-router')

const router = Router({prefix: '/'})

router.get('/', async ctx => ctx.body = 'hello')

//router.get(async ctx => ctx.body = 'hello')

module.exports = router