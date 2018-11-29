import routerStore from "./routerConfig";//路由配置
import carpicStore from "./carpicStore"; //汽车图片的 仓库
import findcarStore from "./findcarStore"; //大表选车 仓库
import saleStore from "./saleStore";// 卖车
import comparecarStore from "./comparecarStore"; //对比车辆的 仓库
import meStore from  "./meStore"; //个人信息的store
//暴露模块
export default {
    modules : {
        //路由的store
        routerStore,
        //汽车图片的store
        carpicStore,
        findcarStore,
        saleStore,
        comparecarStore,
        meStore

    }
}