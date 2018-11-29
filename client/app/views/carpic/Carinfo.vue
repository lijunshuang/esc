<template>
    <div>
        <!-- Mround 是过滤器 可以四舍五入，取小数点几位 可以传参定 -->
        <h2>
            {{carinfo.brand}}
            {{carinfo.series}}
            {{carinfo.color}}色
            {{carinfo.price | Mround(0)}}万元
            {{carinfo.km/10000 | Mround(2)}}万公里
            {{carinfo.engine}}
            {{carinfo.buydate | getyear}}年
            {{carinfo.exhaust}}
            {{carinfo.engine}}
        </h2>
<!-- {{$store.state.carpicStore.carinfo}} -->
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            console.log(this.$route.params.id)
           this.$store.dispatch("carpicStore/init" , {"id" : this.$route.params.id})
        },
        computed : {
            // 当前汽车信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo
            }
        },

    }
</script>

<style scoped>

</style>