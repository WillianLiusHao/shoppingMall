import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/Home/shoppingMall'
import Search from '@/components/pages/Search/Search'
import ShoppingCar from '@/components/pages/shoppingCar/shoppingCar'
import Mine from '@/components/pages/Mine/Mine'
import Register from '@/components/pages/Register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'ShoppingMall', component: ShoppingMall},
    {path: '/search', name: 'Search', component: Search},
    {path: '/shopping-car', name: 'ShoppingCar', component: ShoppingCar},
    {path: '/mine', name: 'Mine', component: Mine},
    {path: '/register', name: 'Register', component: Register}

  ]
})
