import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/Home/shoppingMall'
import Type from '@/components/pages/Type/Type'
import ShoppingCar from '@/components/pages/shoppingCar/shoppingCar'
import Mine from '@/components/pages/Mine/Mine'

import Register from '@/components/pages/Register/Register'
import Login from '@/components/pages/Login/Login'
import Goods from '@/components/pages/Goods/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'ShoppingMall', component: ShoppingMall, meta: { tabbarShow: true } },
    {path: '/type', name: 'Type', component: Type, meta: {tabbarShow: true} },
    {path: '/shopping-car', name: 'ShoppingCar', component: ShoppingCar, meta: {tabbarShow: false}},
    {path: '/mine', name: 'Mine', component: Mine, meta: {tabbarShow: true}},

    {path: '/register', name: 'Register', component: Register, meta: {tabbarShow: false}},
    {path: '/login', name: 'Login', component: Login, meta: {tabbarShow: false}},
    {path: '/goods', name: 'Goods', component: Goods, meta: {tabbarShow: false}}
  ]
})
