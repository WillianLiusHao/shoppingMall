const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async(ctx) => {
    ctx.body = "这是用户首页";
})

router.post('/register', async(ctx) => {
    const User = mongoose.model('User');
    let newUser = new User(ctx.request.body);
    await newUser.save()
        .then(()=>{
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        })  
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
})


module.exports = router;
