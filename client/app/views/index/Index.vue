<template>
    <div>
        <h2 style="font-size:80px;">首页</h2>
        <!-- <router-link :to="{'name' : 'carpic', 'params' :{'id':1000066}}">点我去工作面</router-link> -->
        <h2>
            <router-link :to="{'name': 'carlist'}">点我去carlist</router-link>
        </h2>
        <h2>
            <router-link :to="{'name': 'sale'}">点我去sale</router-link>
        </h2>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
h2{text-align: center}
</style>