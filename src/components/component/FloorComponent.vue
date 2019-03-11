<template>
  <div class="floor">
        <div class="floor-title">{{floorName}}</div>
        <div class="floor-unnormal">
            <div class="double-size">
                <img :src="floorDate0.image" width="100%">
            </div>
            <div>
                <div><img :src="floorDate1.image" width="100%"></div>
                <div><img :src="floorDate2.image" width="100%"></div>
            </div>
        </div>

        <div class="floor_normal">
            <div v-for="(item, index) in floorDate.slice(3)" :key="index">
                <img :src="item.image" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['floorDate', 'floorName'],
    data() {
        return {
            floorDate0: {},
            floorDate1: {}, 
            floorDate2: {}, 
        }
    },
    watch: {
        floorDate: function(val) {
            this.floorDate0 = this.floorDate[0];
            this.floorDate1 = this.floorDate[1];
            this.floorDate2 = this.floorDate[2];
        }
    }

};
</script>

<style scoped>
/* start floor */
    .floor-title {
        height: 2.4rem;
        padding-left: 0.6rem;
        font-size: 16px;
        line-height: 2.4rem;
        font-weight: 600;
        color: #333;
    }
    .floor-unnormal {
        display: flex;
        flex-direction: row;
        background: #fff;
        border-bottom: 1px solid #e0e0e0;
    }
    .floor-unnormal .double-size {
     border-right: 1px solid #e0e0e0;
    }
    .floor-unnormal div {
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #e0e0e0;
    }

    .floor_normal {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        background-color: #fff;
    }
    .floor_normal div {
        box-sizing: border-box;
        width: 50%;
        border-bottom: 1px solid #e0e0e0;
    }
    .floor_normal div:nth-child(odd) {
        border-right: 1px solid #e0e0e0;
    }
</style>