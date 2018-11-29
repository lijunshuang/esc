<template>
    <div>
        <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px" :value="v" @on-change="changeHandler" :clearable="false"></DatePicker>
    </div>
</template>

<script>
    export default {
        props : ["english"],
        // 计算后的属性
        computed : {
            //得到store的filter数据中和这个组件的k相同的项
            getsoterFilter(){
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0];
            },
            v(){
                // 判断是否有这个键
                if(this.getsoterFilter){
                    return this.getsoterFilter.v.split("to").map(item=>new Date(+item));
                }else{
                    return [];
                }
            },
        },
        methods: {
            changeHandler(v){
                this.$store.dispatch("findcarStore/changeFilter", {"k":this.english, "v" : v.map(item=>Date.parse(item)).join("to")})
            }
        },
    }
</script>

<style scoped>

</style>