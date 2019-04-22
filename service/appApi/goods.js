const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

// 导入所有商品
router.get('/insertAllGoodsInfo', async(ctx)=>{
    fs.readFile('./data_json/newGoods.json', 'utf8', (err,data)=>{
        data = JSON.parse(data); //数据转成json对象
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value, index)=>{
            console.log(value);
            let newGoods = new Goods(value);
            newGoods.save().then(()=>{
                saveCount ++;
                console.log('插入商品成功'+saveCount);
            }).catch(e=>{
                console.log(e)
            })
        })
    })
    ctx.body = "开始导入数据"
})

// 导入所有商品大类
router.get('/insertAllCategory', async(ctx)=>{
    fs.readFile('./data_json/category.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index)=>{
            console.log(value);
            const newCategory = new Category(value); //将值包装成对象,对象就有了相应的保存等方法
            newCategory.save().then(()=>{
                saveCount ++;
                console.log('插入商品大类成功'+saveCount);
            }).catch(e=>{
                console.log('插入失败' + e)
            })
        })
    })
    ctx.body = '开始导入商品大类...'
})

// 导入所有商品子类
router.get('/insertAllCategorySub', async(ctx)=>{
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('categorySub');
        data.RECORDS.map((value, index)=>{
            console.log(value);
            const newCategorySub = new CategorySub(value); //将值包装成对象,对象就有了相应的保存等方法
            newCategorySub.save().then(()=>{
                saveCount ++;
                console.log('插入商品子类成功'+saveCount);
            }).catch(e=>{
                console.log('插入失败' + e)
            })
        })
    })
    ctx.body = '开始导入商品子类...'
})

// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ID:goodsId}).exec(); //await 异步请求
        ctx.body = {code: 200, message: result};
    }catch(err){
        console.log(err)
        ctx.body = {code: 500, message: err}
    }
})
module.exports = router;
