const Mongoose = require('mongoose')
const db = 'mongodb://localhost/shopping-db'
const glob = require('glob')
const { resolve } = require('path')


exports.initSchema = () => {
    // 引入所有的schema
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
    // 链接数据库
    Mongoose.connect(db)
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        // 数据库监听事件
        Mongoose.connection.on('disconnection', ()=> {
            if(maxConnectTimes < 3){
                console.log('************** 数据库断开,正在重连 *************')
                maxConnectTimes++;
                Mongoose.connect(db);
            }else{
                reject()
                throw new Error("***********数据库出现错误， 程序无法处理， 请认为手动解决*********")
            }
        })

        Mongoose.connection.on('error', (err)=> {
            if(maxConnectTimes < 3){
                console.log('************** 数据库错误，正在重连 *************')
                maxConnectTimes++;
                Mongoose.connect(db);
            }else{
                reject(err)
                throw new Error("数据库出现错误， 程序无法处理， 请认为手动解决")
            }
        })

        Mongoose.connection.once('open', ()=> {
            console.log('MongoDB connected success');
            resolve()
        })
    })
    
}