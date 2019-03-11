<template>
    <div>
        <!-- search-bar -->
        <div class="search-bar">
            <van-row>
                <van-col span="3" class="locationImg">
                    <img :src="locationIcon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input"  placeholder="请输入您要找的商品">
                </van-col>
                <van-col span="5">
                    <van-button round size="mini" class="search-button">搜索</van-button>
                </van-col>
            </van-row>
        </div>

        <!-- swiper -->
        <div class="swiper-wrap">
            <van-swipe :autoplay="3000">
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
        <floor-component :floorName="floorName.floor1" :floorDate="floor1"></floor-component>
        <floor-component :floorName="floorName.floor2" :floorDate="floor2"></floor-component>
        <floor-component :floorName="floorName.floor3" :floorDate="floor3"></floor-component>

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    import FloorComponent from '../component/FloorComponent'
    import {toMoney} from '@/filters/moneyFilter.js'

    export default {
        data() {
            return {
                swiperOption: {
                    slidesPerView : 3
                },
                msg: 'shoppingMall',
                locationIcon: require('../../assets/images/location.png'),
                bannerImg: [],
                category: [],
                advertes: '',
                recommendGoods: [],
                floorName: {},
                floor1: [],
                floor2: [],
                floor3: [],
            }
        },
        components: {swiper, swiperSlide, FloorComponent},
        created() {
            axios({
                url: 'https://www.easy-mock.com/mock/5c7d178fcf384074c61ce151/GraduationProject/index',
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
    /* start search-bar */
        .search-bar{
            height: 2.2rem;
            background: #e5017d;
            line-height: 2.2rem;
        }
        .locationImg{
            text-align: center;
            line-height: 2.2rem;
        }
        .locationImg img{
            width: 50%;
            vertical-align: middle;
        }
        .search-input{
            width: 100%;
            height: 1.3rem;
            border: 0;
            border-bottom: 1px solid #fff;
            background: #e5017d;
            color: #fff;
        }
        .search-input::-webkit-input-placeholder{
            color: #fff;
        }
        .search-button{
            margin-left: .4rem;
        }
    /* end search-bar */

    /* start wiper-wrap */
        .swiper-wrap{
            max-height: 10.6rem;
            overflow: hidden;
        }
    /* end wiper-wrap */

    /* start type-bar */
        .type-bar{
            background: #fff;
            margin: 0 .3rem .3rem;
            border-radius: .3rem;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
        .type-bar .type-item{
            padding: .3rem;
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
            padding: .32rem;
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
            line-height: 1.4rem;
        }
        .old-price{
            text-decoration: line-through;
        }
    /* end recomend-area */

    /* start hot-area */
    .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
    }
    /* end hot-area */

</style>