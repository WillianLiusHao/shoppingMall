<template>
  <div id="app">
    <router-view/>
    <!-- tabbar-area -->
    <van-tabbar v-model="active">
        <van-tabbar-item icon="shop" to="home">首页</van-tabbar-item>
        <van-tabbar-item icon="label" dot to="search">搜索</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" info="5" to="shopping-car">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager" info="20" to="mine">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0
    }
  },
}
</script>

<style>
#app {
  background: #f0f0f0;
}
</style>
