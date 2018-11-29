import CarAvatar from "./tablegrid/CarAvatar";
import BuyDate from "./tablegrid/BuyDate";
import Km from "./tablegrid/Km";
export default [
    {
        title: "预览图",
        key : "avatar",
        //h 是creatElement 函数的缩写
        render(h, {row}){ //动态渲染 图片,传入 row 参数
            return h(CarAvatar, {
                props : {
                    row
                }
            });//放组件
        },
        width: 100,
        padding : 0
    },
    {
        title: "id",
        key : "id",
        sortable: "cumtom",
        sortType: "asc"
    },
    {
        title: "品牌",
        key : "brand"
    },
    {
        title: "车系",
        key : "series"
    },
    {
        title: "颜色",
        key : "color"
    },
    {
        title: "价格",
        key : "price",
        sortable: "cumtom",
    },
    {
        title: "公里",
        key : "km",
        render (h ,{row}){
            return h(Km , {
                props : {
                    km : row.km
                }
            });
        },
        sortable: "cumtom",
    },
    {
        title: "发动机",
        key : "engine"
    },
    {
        title: "排放",
        key : "exhaust"
    },
    {
        title: "燃料",
        key : "fuel"
    },
    {
        title: "变速箱",
        key : "gearbox"
    },
    {
        title: "是否上牌",
        key : "license"
    },
    {
        title: "购买日期",
        key : "buydate",
        render (h , {row}){
            return h(BuyDate , {
                props : {
                    buydate: row.buydate
                }
            })
        }
    },
]