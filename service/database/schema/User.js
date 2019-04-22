const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10 // 加盐强度

// 创建UserSchema
const userSchema = new Schema({
    userId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
})

// 每次保存的时候加密
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
        if(err) return next(err)
        console.log('*******用户密码*******')
        console.log("salt： " + salt);
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return next(err)
            console.log("hash: " + hash)
            user.password = hash
            next()
        })
    })
})

// 登录时候的密码匹配
userSchema.methods = {
    comparePassword:(_password, password) =>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if(!err) resolve(isMatch);
                else reject(err);
            })
        })
    }
}

// 发布模型
Mongoose.model('User', userSchema);  
// 'User'指的是数据库中的表名，这里利用model把数据库中的表和我们自己定义的userSchema绑定上了
