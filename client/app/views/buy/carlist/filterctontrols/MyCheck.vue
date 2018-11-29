<template>
    <div>
        <CheckboxGroup v-model="m">
            <Checkbox v-for="item in options" :label="item" :key="item.id"></Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        props : ["options","english"],
        // 计算后的属性
        computed : {
            getsoterFilter(){
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0];
            },
            m : {
                get(){
                    // 判断是否有这个键
                    if(this.getsoterFilter){
                        return this.getsoterFilter.v.split("v");
                    }else{
                        return [];
                    }
                },
                set(v){
                    this.$store.dispatch("findcarStore/changeFilter", {"k":this.english, "v" : v.join("v")})
                    console.log(v);
                }
            }
        }
    }
</script>

<style scoped lang="less">

</style>