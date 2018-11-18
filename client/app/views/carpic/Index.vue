<template>
    <div>
        <div class="bgbox">
            <div class="bigimg">
                <Bigimg></Bigimg>
            </div>

            <div class="right_box">
                <div class="carinfo">
                    <Carinfo></Carinfo>
                </div>
                <div class="choosealbum">
                    <Choosealbum></Choosealbum>
                </div>
                <div class="smallnav">
                    <Smallnav></Smallnav>
                </div>
            </div>
        </div>
    <!-- {{$route.params.id}} -->
    </div>
</template>

<script>
import Bigimg from "./Bigimg";
import Carinfo from "./Carinfo";
import Choosealbum from "./Choosealbum";
import Smallnav from "./Smallnav";

    export default {
        //在组件创建之前，拉取信息
        beforeCreate() {
            //发出请求
            this.$store.dispatch("carpicStore/loadData" , {"id": this.$route.params.id})
        },
        computed : {
            id(){
                return this.$route.params.id
            }
        },
        components : {
            Bigimg,
            Carinfo,
            Choosealbum,
            Smallnav
        }
    }
</script>

<style scoped lang="less">
.bgbox{
    position: fixed;
    width:100%;height: 100%;color:#fff;background:#000;
    // padding-right:320px;
    .bigimg{margin-right:320px;background:#ddd}
    .right_box{
       width:320px; 
       height: 100%;
       overflow: hidden;
       padding:10px;
       position: absolute;
       top:0px;right:0px;
       border-left:1px solid #555;
        &>div{
            margin-bottom:10px;
        }
    }
}

</style>