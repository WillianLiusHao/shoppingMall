const Koa = require('koa')
const app = new Koa()
const { connect, initSchema } = require('./database/init.js')
const Mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')


app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect();
  initSchema(); // 载入所有schema
  // const User = Mongoose.model('User'); 
  // let oneUser = new User({userName: 'william004', password: '123456'}); // new一个user 对象
  // oneUser.save().then(()=>{
  //     console.log("插入成功");
  // })
})()

app.use(async (ctx) => {
  ctx.body = '<h1>this is shoppingMall !!!</h1>';
})

app.listen(3000, () => {
  console.log('server start on port 3000');
})
