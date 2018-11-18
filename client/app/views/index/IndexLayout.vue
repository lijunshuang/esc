<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="$store.state.routerStore.columnname" @on-select="changeNav">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                            <Icon type="ios-keypad"></Icon>
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                            <Icon type="ios-analytics"></Icon>
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="ios-paper"></Icon>
                            用户
                        </MenuItem>
                        <MenuItem name="park">
                            <Icon type="ios-paper"></Icon>
                            停车场
                        </MenuItem>
                    </div>
                </Menu>
            </Header>    
        </Layout>  
        <router-view></router-view> 
    </div>
</template>

<script>
    export default {
        created() {
            //从path中 提取 /index/ 之后的栏目，使之 高光
            // console.log(this.$route.fullPath.match(/\/index\/(\w+)/)[1]);
        },
        methods: {
            changeNav(n) {
                if(n == "buy"){
                    n = "carlist"
                }
                // alert(n);
                this.$router.push({"name" : n})
            }
        },

    }
</script>

<style scoped lang="less">
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 520px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>