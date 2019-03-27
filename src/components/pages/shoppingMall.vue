<template>
    <div>
        <search-bar :searchGoods="goods"></search-bar>

        <!-- swiper -->
        <div class="swiper-wrap">
            <van-swipe :autoplay="3000" :height="168">
                <van-swipe-item v-for="(banner, index) in bannerImg" :key="index">
                    <img v-lazy="banner.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- type-bar -->
        <div class="type-bar">
            <div class="type-item" v-for="(item, index) in category" :key="index">
                <img v-lazy="item.image" width="90%">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>

        <!-- advertes -->
        <div>
            <img v-lazy="advertes.PICTURE_ADDRESS" width="100%">
        </div>

        <!-- recommend-area -->
        <div class="recomend-area">
            <div class="recomend-title">商品推荐</div>
            <div class="recomend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key= index>
                        <div class="slide-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div class="goods-price">
                                ￥{{item.price | moneyFilter}}
                                <span class="old-price">(￥{{item.mallPrice | moneyFilter}})</span>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <!-- floor-area -->
        <floor :floorName="floorName.floor1" :floorDate="floor1"></floor>
        <floor :floorName="floorName.floor2" :floorDate="floor2"></floor>
        <floor :floorName="floorName.floor3" :floorDate="floor3"></floor>

        <!-- hotGoods-area -->
        <div class="hot-area">
            <div class="hot-title"><van-icon name="fire" />热卖商品</div>
            <div class="hot-goods">
                <!-- vanList组件 -->
                <van-list>
                    <van-row getter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info :goodsImg="item.image" 
                                        :goodsName="item.name" 
                                        :goodsPrice="item.price">
                            </goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        
        <!-- tabbar-area -->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="label" dot>分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" info="5">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager" info="20">个人中心</van-tabbar-item>
        </van-tabbar>
        

    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    import Floor from '../component/FloorComponent'
    import GoodsInfo from '../component/goodsinfoComponent'
    import SearchBar from '../component/SearchBar'

    import {toMoney} from '@/filters/moneyFilter.js'
    import url from '@/serviceApi.config.js'

    export default {
        data() {
            return {
                swiperOption: {
                    slidesPerView : 3
                },
                goods: "",
                bannerImg: [],
                category: [],
                advertes: '',  // 广告
                recommendGoods: [],  // 推荐商品
                floorName: {},  // 楼层
                floor1: [],
                floor2: [],
                floor3: [],
                hotGoods: [],    // 热卖
                active: 0,   // 底部导航
            }
        },
        components: {swiper, swiperSlide, Floor, GoodsInfo, SearchBar},
        created() {
            axios({
                url: url.getShoppingMallInfo,
                type: 'get'
            })
            .then(res => {
                console.log(res);
                var data = res.data.data;
                this.bannerImg = data.slides;
                this.category = data.category;
                this.advertes = data.advertesPicture;
                this.recommendGoods = data.recommend;
                this.floorName = data.floorName;
                this.floor1 = data.floor1;
                this.floor2 = data.floor2;
                this.floor3 = data.floor3;
                this.hotGoods = data.hotGoods;
            })
            .catch(err => {
                console.log(err);
            })
        },
        filters: {
            moneyFilter: toMoney
            
        }
    }
</script>

<style scoped>
    p{
        padding: 0;
        margin: 0;
    }

    /* start wiper-wrap */
        .swiper-wrap{
            margin-top: 1rem;
            overflow: hidden;
        }
    /* end wiper-wrap */

    /* start type-bar */
        .type-bar{
            background: #fff;
            margin: .2rem .1rem;
            border-radius: .3rem;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
        .type-bar .type-item{
            padding: .1rem;
            text-align: center;
            font-size: 12px;
        }
    /* end type-bar */

    /* star recomend-area */
        .recomend-area{
            background: #fff;
            margin-top: .1rem;
        }
        .recomend-title{
            border-bottom: 1px solid #eee;
            font-size: 16px;
            padding: .16rem;
            color: #e5017d;
        }
        .recomend-body{
            border-bottom: 1px solid #eee;
        }
        .slide-item{
            width: 100%;
            box-sizing: border-box;
            border-right: 1px solid #eee;
            font-size: 14px;
            text-align: center;
        }
        .slide-item .goods-price{
            line-height: .68rem;
        }
        .old-price{
            text-decoration: line-through;
        }
    /* end recomend-area */

    /* start hot-area*/
        .hot-area{
            text-align: center;
            font-size: 16px;
            height: .8rem;
            line-height: .8rem;
        }
    /* end hot-area*/


</style>