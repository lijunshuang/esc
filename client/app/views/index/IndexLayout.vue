<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="$store.state.routerStore.col2ndname" @on-select="changeNav">
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
                        <div class="avatar">
                            <Poptip trigger="hover" content="content">
                                <div slot="content" class="content_slot">
                                    <ul>
                                        <li><a href="javascript:void(0)" @click="showModal">更换头像</a></li>
                                        <li><a href="javascript:void(0)">退出登录</a></li>
                                    </ul>
                                </div>
                                <Avatar v-if="!meinfo.avatar" icon="ios-person" size="large" />
                                <Avatar v-if="meinfo.avatar" :src="`http://127.0.0.1:3000/images/avatars/${meinfo.username}.jpg`" size="large" />
                            </Poptip>
                            <!-- 11{{meinfo.avatar}}22 -->
                            欢迎你，{{meinfo.name}} !
                        </div>
                    </div>
                </Menu>
            </Header>    
        </Layout>  
        <router-view></router-view> 

        <!-- 更改头像的模态框 -->
        <ChangeAvatar v-if="isShowModal" @close="closeModal"></ChangeAvatar>
    </div>
</template>

<script>
    export default {
        created() {
            //从path中 提取 /index/ 之后的栏目，使之 高光
            // console.log(this.$route.fullPath.match(/\/index\/(\w+)/)[1]);
        },
        data() {
            return {
                isShowModal : false
            }
        },
        computed : {
            meinfo(){
                return this.$store.state.meStore
            }
        },
        methods: {
            changeNav(n) {
                if(n == "buy"){
                    n = "carlist"
                }
                // alert(n);
                this.$router.push({"name" : n})
            },
            //
            showModal(){
                this.isShowModal = true
            },
            closeModal(){
                this.isShowModal = false
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
    width: 640px;
    margin: 0 auto;
    margin-right: 20px;
    &::after{content: "";display: block;clear: both;}
    
    .avatar{
        color:orange;

        .content_slot{
            a{display: block;line-height: 30px;}
        }
    }
}
.layout-footer-center{
    text-align: center;
}
</style>