
import IndexLayout from "./views/index/IndexLayout"; //导航布局
import Index from "./views/index/Index"; //首页
import Sale from "./views/sale"; //卖车
import User from "./views/user"; //用户
import BuyLayout from "./views/buy"; //买车
import Carlist from "./views/buy/carlist";
import Ai from "./views/buy/ai";
import Sifa from "./views/buy/sifa";
import Park from "./views/park";
import Carpic from "./views/carpic";

// import Vue from "vue"; //引入vue
import VueRouter from "vue-router";//引入路由文件
// Vue.use(VueRouter);

const getRouter = (store) => {
    const router = new VueRouter({
        routes: [
            {// header 区域
                path : "/index",
                component : IndexLayout,
                children : [
                    {
                        path: "index", //首页
                        component : Index,
                        name: "index",
                    },{
                        path: "sale", //卖车
                        component : Sale,
                        name : "sale"
                    },{
                        path : "user", //用户栏目
                        component : User,
                        name : "user"
                    },{
                        path : "buy",// 买车
                        component : BuyLayout,
                        
                        children : [
                            {
                                path : "",
                                //当用户输入buy的时候 自动跳转到 carlist 栏目
                                redirect : {
                                    name : "carlist"
                                }
                            },{
                                path: "carlist", //买车列表
                                component : Carlist,
                                name : "carlist"
                            },{
                                path: "ai", //ai看车
                                component: Ai,
                                name : "ai"
                            },{
                                path : "sifa", //
                                component : Sifa,
                                name : "sifa"
                            }
                        ],
                        name : "buy",
                    },{
                        // 停车场
                        path: "park",
                        component : Park,
                        name: "park"
                    }
                ]
            },{
                //全屏汽车大图
                path: "/carpic/:id", 
                component : Carpic,
                name : "carpic"
            },{
                path : "*", //匹配首页，避免乱输出现空白页
                redirect : {"name" : "index"}
            }

        ]
    });
    //当路由跳转的时候做的事情，就是路由守卫
    router.afterEach((to, from) => {
        // console.log(to);//是个 大对象
        // console.log(to.fullPath.match(/\/index\/(\w+)/)[1]);
        //如果匹配这个模式
        if(/\/index\/(\w+)/.test(to.fullPath)){
            //提炼路由中的index/xxx/aaaa的 xxx 部分。正则表达式的圆括号表示捕获
            store.commit("routerStore/changeColumnName" , {"cn" : to.fullPath.match(/\/index\/(\w+)/)[1]});
        };
        //左侧二级栏目 匹配
        if(/\/index\/\w+\/(\w+)/.test(to.fullPath)){
            //提炼路由中的index/xxx/aaaa的 xxx 部分。正则表达式的圆括号表示捕获
            store.commit("routerStore/change2NdName" , {"cn" : to.fullPath.match(/\/index\/\w+\/(\w+)/)[1]});
        }
        
    });
    return router;
}

export default getRouter;


