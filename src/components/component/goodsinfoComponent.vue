<template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsImg" width="100%">
        </div>
        <div class="goods-name">{{ goodsName }}</div>
        <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/filters/moneyFilter.js'
    export default {
        props: ['goodsImg', 'goodsName', 'goodsPrice'],
        filters: {
            moneyFilter: toMoney
        }
    }
</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>