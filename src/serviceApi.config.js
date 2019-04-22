const BASEURL = 'https://www.easy-mock.com/mock/5c7d178fcf384074c61ce151/GraduationProject/'
const LOCALURL = '//localhost:3000/'
const URL = {
    getShoppingMallInfo: BASEURL + 'index',     // 商城首页
    registerUser: LOCALURL + 'user/register',   // 用户注册接口
    loginUser: LOCALURL + 'user/login',         // 用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',   // 获取商品详情
}

module.exports = URL 