<template>
    <div>
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu :active-name="$store.state.routerStore.change2NdName" theme="light" width="auto" @on-select="changeleftNav">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                    </template>
                    <MenuItem name="carlist">大表选车</MenuItem>
                    <MenuItem name="ai">Ai 荐车</MenuItem>
                    <MenuItem name="sifa">司法拍卖车辆购置</MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                   <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        
        methods: {
            changeleftNav(n) {
                this.$router.push({"name" : n})
            }
        },
    }
</script>

<style scoped>

</style>