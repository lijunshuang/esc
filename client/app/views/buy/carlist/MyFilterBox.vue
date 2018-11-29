<template>
    <div>
        <Row v-for="item in filterControls" :key="item.id">
            <Col :span="3">
                {{item.chinese}}
            </Col>
            <Col :span="21">
            <MyCheck v-if="item.type == 'MyCheck'" :options="item.options" :english="item.english"></MyCheck>
            <MyRange v-if="item.type == 'MyRange'" :min="item.min" :max="item.max" :english="item.english" :conversion="item.conversion"></MyRange>
            <MyDateRange v-if="item.type == 'MyDateRange'" :english="item.english"></MyDateRange>
            </Col>
        </Row>
        <div style="clear:both"></div>
        <div style="margin:10px 0px 5px;clear:both">
            <Row>
                <Col :span="24">
                    <Tag closable v-for="item in filters" :key="item.k" @on-close="closeHandler(item.k)">
                        {{getK(item.k)}} : {{getV(item.k, item.v)}}
                    </Tag>
                </Col>
            </Row>
        </div>
        
    </div>
</template>

<script>
//上面的 :is 是 占位，表示当前是什么组件
import MyCheck from "./filterctontrols/MyCheck";//引包 复选框  
import MyRange from "./filterctontrols/MyRange"; //滑动条
import MyDateRange from "./filterctontrols/MyDateRange"; //滑动条
import moment from "moment"; //时间戳转日期 的包
    export default {
        //数据
        data(){
            return {
                //所有的筛选控件
                filterControls : [
                    {
                        "chinese" : "颜色",
                        "english" : "color",
                        "type" : "MyCheck",
                        "options" : ["红", "黄", "绿", "蓝", "黑", "白", "灰", "银灰", "咖啡"]
                    },
                    {
                        "chinese" : "发动机",
                        "english" : "engine",
                        "type" : "MyCheck",
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L","4.0L"]
                    },
                    {
                        "chinese" : "排放标准",
                        "english" : "exhaust",
                        "type" : "MyCheck",
                        "options" : ["国一", "国二", "国三", "国四", "国五"]
                    },
                    {
                        "chinese" : "变速箱",
                        "english" : "gearbox",
                        "type" : "MyCheck",
                        "options" : ["手动","自动","手自一体"]
                    },
                    {
                        "chinese" : "燃料",
                        "english" : "fuel",
                        "type" : "MyCheck",
                        "options" : ["汽油","柴油","纯电动","油电混合"]
                    },
                    {
                        "chinese" : "售价(万元)",
                        "english" : "price",
                        "type" : "MyRange",
                        "min" : 1,
                        "max" : 120,
                        "conversion": 1,
                    },
                    {
                        "chinese" : "公里数(万公里)",
                        "english" : "km",
                        "type" : "MyRange",
                        "min" : 0,
                        "max" : 2000000, //真值
                        "conversion" : 10000, //将10000 当做1
                    },
                    {
                        "chinese" : "购买日期",
                        "english" : "buydate",
                        "type" : "MyDateRange",
                    },
                ]
            }
        },
        computed : {
            //全局已经有的筛选条件
            filters(){
                return this.$store.state.findcarStore.filters;
            }
        },
        methods: {
            //英语名字 换 中文
            getK(k){
                return this.filterControls.filter(item=>item.english == k)[0].chinese
            },
            //规整一下 to换到，v换或
            getV(k, v){
                // 看类型
                var type = this.filterControls.filter(item=>item.english == k)[0].type;
                //区别
                if (type == "MyCheck"){
                    return v.replace(/v/g," 或 ");
                } else if(type == "MyDateRange"){
                    return v.split("to").map(item=>{
                        return moment(+item).format("YYYY年MM月DD日");
                    }).join("到");
                };
                //几个特例
                if (k == "price") {
                    return v.split("to").map(item=>item+"万元").join(" 到 ");
                } else if(k == "km"){
                    return v.split("to").map(item=>item/10000 + "万公里").join(" 到 ");
                }
            },
            closeHandler(k){
                this.$store.dispatch("findcarStore/delFilter", {k})
            }
        },
        components : {
            MyCheck,
            MyRange,
            MyDateRange,
            moment
        }
    }
</script>

<style scoped lang="less">
.ivu-row{height:30px;}
</style>