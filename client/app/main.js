import Vue from "vue"; //引入vue
import Vuex from "vuex"; //引入vuex
import iview from "iview"; //引入iview UI
import App from "./App"; //引入app根组件
import getRouter from "./router";//引入路由文件
import VueRouter from "vue-router";//引入路由文件
import storeObj from "./stores"; //引入store 仓库，就可以使用 vuex了
import Mround from "./filters/math_round";//四射五入  方法,使用时 需 传参
import getyear from "./filters/getyear";//时间戳 转 年
import Tutu from "./components/Tutu"
//安装包
Vue.use(Vuex);
Vue.use(iview);
Vue.use(VueRouter);
const store = new Vuex.Store(storeObj);
//定义过滤器
Vue.filter("Mround",Mround);
Vue.filter("getyear",getyear);

Vue.component("Tutu",Tutu);

//组件上树
new Vue({
    el : "#app",
    render(h){
        return h(App)
    },
    router : getRouter(store),
    store,
    //全局的过滤器

})




