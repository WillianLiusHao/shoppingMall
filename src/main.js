// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "./assets/css/reset.css"
import router from './router'
import {Button, Row, Col, Swipe, SwipeItem, 
        Lazyload, List, Tabbar, TabbarItem, 
        Icon, Field, NavBar, Search, Tab, Tabs} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
    .use(Lazyload).use(List).use(Tabbar).use(TabbarItem).use(Icon)
    .use(Field).use(NavBar).use(Search).use(Tab).use(Tabs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
