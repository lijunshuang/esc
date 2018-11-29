<template>
    <div>
        <!-- <CompareCar :isOpen="isOpen" @close="closeDrawer"></CompareCar> -->
        <Drawer title="我的对比" :closable="false" width="640" :value="isOpen" @on-close="closeDrawer">
            <!-- <ul class="carlist">
                <li v-for="item in getCompareArr" :key="item.id">
                    {{item}}
                    <span class="pic"><img :src="`http://127.0.0.1:3000/images/carimages_small/${item.id}/view/${item.avatar}`" /></span>
                    <span>id:{{item.id}}</span>
                </li>
            </ul> -->
            {{getCompareArr}}
            <div class="" v-if="getCompareArr">
                <Table :columns="columns" :data="getCompareArr"></Table>
            </div>
        </Drawer>

        <div class="compareBtn" @click="showDrawer">
            {{$store.state.comparecarStore.arr.length}}
        </div>
    </div>
</template>

<script>
// import CompareCar from "./CompareCar";//对比的汽车组件
import Km from "../views/buy/carlist/tablegrid/Km";
import BuyDate from "../views/buy/carlist/tablegrid/BuyDate";
    export default {
        data(){
            return {
                isOpen : false,
                columns : [
                    // {
                    //     title: '缩略图',
                    //     key: 'avatar'
                    // },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '车系',
                        key: 'series'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '公里数',
                        key: 'km',
                        // render (h, {row}){
                        //     return h(Km , {
                        //         props : {
                        //             row
                        //         }
                        //     })
                        // },
                    },
                    {
                        title: '发动机',
                        key: 'engine'
                    },
                    {
                        title: '排放',
                        key: 'exhaust'
                    },
                    {
                        title: '变速箱',
                        key: 'gearbox'
                    },
                    {
                        title: '燃料',
                        key: 'fuel'
                    },
                    {
                        title: '购买日期',
                        key: 'buydate',
                        // render (h , {getCompareArr}){
                        //     return h(BuyDate , {
                        //         props : {
                        //             buydate: getCompareArr.buydate
                        //         }
                        //     })
                        // }
                    },
                ]
            }
        },
        methods: {
            showDrawer() {
                this.isOpen = true;
            },
            closeDrawer(){
                this.isOpen = false;
            }
        },
        computed : {
            getCompareArr(){
                return this.$store.state.comparecarStore.arr;
            }
        },
        components : {
            Km,BuyDate
        }
    }
</script>

<style scoped lang="less">
.carlist{
    list-style: none
}
.compareBtn{
    position: fixed;bottom:130px;right:30px;z-index:99;width:40px;height: 40px;line-height:40px;text-align:center;font-weight: bold;font-size: 30px;cursor: pointer;color:#fff;background:orange;border-radius: 50%;
}
</style>