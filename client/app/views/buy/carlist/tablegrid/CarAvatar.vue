<template>
    <div class="car_wrap">
        <router-link :to="{'name' : 'carpic', 'params' : {'id': row.id}}">
            <img :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`" />
        </router-link>
         <!-- {{row.avatar}} -->
         <span v-if="!isInCompare" class="db1" @click="addCompare">加入对比</span>
         <span v-if="isInCompare" class="db2">已加入对比</span>
         <span v-if="isInCompare" class="db3" @click="delCompare">取消对比</span>
    </div>
</template>
 
<script>
    export default {
        props :["row"],
        data() {
            return {
                isInCompare : false,
            }
        },
        created() {
            // 当显示头像的时候，判断自己是否在对比队列中
            this.setIn();
        },
        methods: {
            //加入对比
            addCompare() {
                if (this.getCompareArr.length < 4) {
                    this.$store.commit("comparecarStore/addCar", {"carinfo": this.row});
                    this.$Message.info("加入对比成功")
                } else {
                    this.$Message.error("最多对比4辆车")
                }
            },
            //取消对比
            delCompare(){
                this.$Message.info("取消对比成功");
                this.$store.commit("comparecarStore/delCar", {"id" : this.row.id})
            },
            //设置是否在对比
            setIn(){
                // 计算自己是不是已经在队列中
                for (let i = 0; i < this.getCompareArr.length; i++) {
                    if(this.getCompareArr[i].id == this.row.id){
                        this.isInCompare = true;
                        return
                    }
                }
                this.isInCompare = false;
            }
        },
        computed : {
            // 从全局要对比队列  
            getCompareArr(){
                return this.$store.state.comparecarStore.arr;
            }
        },
        watch: {
            getCompareArr(){
                this.setIn();
            }
        }
    }
</script>

<style scoped lang="less">
img{width:100%}
.ivu-table-cell{padding:0px !important}
.car_wrap{
    position:relative;width:130%;left:-15%;top:2px;
    span{
        position: absolute;top:0px;right:0px;width:70px;height:20px;line-height:20px;text-align:center;color:#fff;cursor: pointer;transition:all .4s ease 0s;display:none;
        &.db1{background:orange}
        &.db2{background:red;display:block;}
        &.db3{background:#888}

    }
    &:hover .db1{display: block}
    &:hover .db2{display: none}
    &:hover .db3{display: block}
}

</style>