<template>
    <div class="search-bar">
        <van-row>
            <van-col span="3" class="left-icon">
                <van-icon name="wap-nav" color="#fff" size=".6rem"/>
            </van-col>
            <van-col span="16">
                <van-search placeholder="请输入搜索关键词" v-model="goods" background="#e5017d"/>
            </van-col>
            <van-col span="5" class="button-wrap">
                <van-button round size="small" class="search-button">搜索</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        props: ['searchGoods'],
        data() {
            return {
                goods: ''
            }
        },
        watch:{
            searchGoods: function(val){
                this.goods = this.searchGoods
            }
        }
    }
</script>

<style scoped>
    .search-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        height: 1rem;
        background: #e5017d;
        line-height: 1rem;
    }
    .left-icon{
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .van-search{
        height: 1rem;
        padding: 0;
    }
    .search-input::-webkit-input-placeholder{
        color: #fff;
    }
    .button-wrap{
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>