<template>
    <div class="login_box">
        <div class="login_con">
            <h2>二手车交易市场内部系统</h2>
            <Form ref="formInline" :model="formInline">
                <FormItem prop="username">
                    <Input type="text" v-model="formInline.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submit('formInline')">登录</Button>
                </FormItem>
            </Form>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
    export default {
        data() {
            return {
                formInline : {
                    username : "",
                    password : ""
                }
            }
        },
        methods: {
            submit() {
                axios.post("/api/login" , {
                    "username" : this.formInline.username,
                    "password" : this.formInline.password
                }).then(data => {
                    if (data.data.result == 1) {
                        this.$router.push({"name" : "index"})
                    } else {
                        this.$Message.error("用户名或密码不对")
                    }
                })
            }
        },
    }
</script>

<style scoped lang="less">
    @h : 300px;
    @w : 500px;
.login_box{
    position: fixed;
    width: 100%;
    height: 100%;
    background:orange;

   .login_con{
       box-sizing: border-box;
       padding:20px;position: absolute;
       top:50%;left: 50%;width:@w;height:@h;margin:-@h/2 0px 0px -@w/2;
       background:#fff;border-radius: 10px;
       box-shadow: 2px 2px 8px #ddd;

       h2{font-size:24px;margin-bottom:20px;}
   }


}
</style>