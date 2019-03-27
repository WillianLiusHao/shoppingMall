const Router = require('koa-router')
let router = new Router()

router.get('/', async(ctx) => {
    ctx.body = "这是首页";
})

router.get('/register', async(ctx) => {
    ctx.body = "这是用户注册接口";
})

module.exports = router;
