<template>
    <div>
        <div class="filterBox">
            <MyFilterBox></MyFilterBox>
        </div>
        <MyTable></MyTable>

        <CompareBtn></CompareBtn>
    </div>
</template>

<script>
import MyTable from "./MyTable";
import MyFilterBox from "./MyFilterBox";
import CompareBtn from "../../../components/CompareBtn";
    export default {
        beforeCreate() {
            this.$store.dispatch("findcarStore/fetchCar")
        },
        
        //注册组件
        components : {
            MyTable,
            MyFilterBox,
            CompareBtn
        }
    }
</script>

<style scoped lang="less">
h4{line-height: 30px;margin-bottom:5px;}
// .filterBox{margin-bottom:20px;}
</style>