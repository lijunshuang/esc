<template>
    <div>
        <Row>
            <Col :span="12">
                <Slider range :min="min/conversion" :max="max/conversion" :value="v" @on-change="changeV" @on-input="changeingV"></Slider>
            </Col>
            <Col  :span="11" :offset="1">
                <Input style="width: 60px" v-model="v1"/>
                ~
                <Input style="width: 60px"  v-model="v2"/>
                <Button type="info" @click="submitHandler">确定</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                v1: this.min/this.conversion,
                v2: this.max/this.conversion
            }
        },
        props : ["min", "max","english","conversion"],
        // 计算后的属性
        computed : {
            //得到store的filter数据中和这个组件的k相同的项
            getsoterFilter(){
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0];
            },
            v(){
                // 判断是否有这个键
                if(this.getsoterFilter){
                    return this.getsoterFilter.v.split("to").map(item=>item/this.conversion);
                }else{
                    return [this.min, this.max];
                }
            },
        },
        methods: {
            changeV(v){
                this.$store.dispatch("findcarStore/changeFilter", {"k":this.english, "v" : v.map(item=>item*this.conversion).join("to")})
                console.log(v);
            },
            //实时滑动
            changeingV(v){
                this.v1 = v[0];
                this.v2 = v[1]
            },
            submitHandler(){
                //检查数据的合法性
                if(isNaN(this.v1) || isNaN(this.v2)){
                    this.$Message.error("请输入数值");
                    return;
                }
                if(this.v1 > this.v2){
                    this.$Message.error("最大值不能小于最小值");
                    return
                };
                this.$store.dispatch("findcarStore/changeFilter", {"k": this.english, "v": [this.v1 * this.conversion, this.v2 * this.conversion].join("to")});
                
            }
        },
        
    }
</script>

<style scoped>

</style>