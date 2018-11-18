<template>
    <div>
        <div class="nav_box" v-if="carinfo.images">
            <!-- {{carinfo.images}} -->
            <ul class="nav">
                <!-- <li>外观（{{carinfo.images.view.length}}）</li>
                <li>内饰（{{carinfo.images.inner.length}}）</li>
                <li>外观（{{carinfo.images.engine.length}}）</li>
                <li>更多细节（{{carinfo.images.more.length}}）</li> -->
                <li v-for="item in arr" :class="{'cur' : nowAlbum == item.english}" @click="changeNowAlbum(item.english)">
                    {{item.chinese}}({{carinfo.images[item.english].length}})
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arr : [
                    {
                        "chinese" : "外观",
                        "english" : "view",
                    },
                    {
                        "chinese" : "内饰",
                        "english" : "inner",
                    },
                    {
                        "chinese" : "结构及发动机",
                        "english" : "engine",
                    },
                    {
                        "chinese" : "更多",
                        "english" : "more",
                    },
                ]
            }
        },
        computed : {
            // 当前汽车信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            //当前的图集名字
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            }
        },
        methods: {
            //改变相册
            changeNowAlbum(nowAlbum) {
                this.$store.dispatch("carpicStore/changeNowAlbum" , {nowAlbum})
            }
        },
    }
</script>

<style lang="less">

.nav{list-style: none;
    width:100%;display: flex;flex-wrap:wrap;
    li{background:#6d5609;margin-right:2%;margin-bottom:8px;text-align:center;width:49%;padding:10px 0px;font-size: 16px;cursor: pointer;}
    li:nth-child(even){margin-right: 0px;}
    &>.cur{background:orange}
}
</style>