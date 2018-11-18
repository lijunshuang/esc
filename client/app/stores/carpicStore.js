import axios from "axios"; //引包
export default {
    namespaced : true,
    state : {
        //看的这一辆车的信息
        carinfo : {},
        nowAlbum : "view", //信号量，当前看的图集名字
        nowIdx : 0, //小序号，当前正在看这个图集中的第几号图，从0开始
    },
    mutations : {
        changeCarinfo(state, {carinfo}){
            state.carinfo = carinfo
        },
        changeNowAlbum(state, {nowAlbum}){
            state.nowAlbum = nowAlbum
        },
        changeNowIdx(state, {nowIdx}){
            state.nowIdx = nowIdx
        }
    },
    actions : {
        //请求服务器数据
        async loadData({commit}, {id}){
            // 切换相册 从第一个图集开始
            commit("changeNowAlbum", {"nowAlbum" : "view"});
            commit("changeNowIdx", {"nowIdx" : 0});

            //then 里面 data可以解构(({data})=>data),等同于((data)=>data.data)
            // const {result} = await axios.get("/api/carinfo?id=" + id).then( (data) => data.data);
            const {result} = await axios("/api/carinfo?id=" + id).then(({data}) => data);
            // console.log(result);
            //通知 mutations 改变
            commit("changeCarinfo" , {"carinfo" : result})
        },
        changeNowAlbum({commit}, {nowAlbum}){
            commit("changeNowIdx" , {"nowIdx" : 0})
            commit("changeNowAlbum" , {nowAlbum})
        },
        //下一张
        goNext({commit,state}){
            if (state.nowIdx < state.carinfo.images[state.nowAlbum].length - 1) {
                commit("changeNowIdx" , {"nowIdx" : state.nowIdx + 1})
            } else {
                commit("changeNowIdx" , {"nowIdx" : 0}); // 小序号归0
                var arr = ["view", "inner" , "engine", "more"];//图集名
                //得到当前的图集序号
                var _ablumidx = arr.indexOf(state.nowAlbum);
                //让序号加1
                var _nextAlbumidx = (_ablumidx + 1) % 4;
                //变图集
                commit("changeNowAlbum" , {"nowAlbum" : arr[_nextAlbumidx]})
            }
        },
        //上一张
        goPrev({commit, state}){
            if (state.nowIdx > 0) {
                commit("changeNowIdx" , {"nowIdx" :state.nowIdx - 1})
            } else {
                var arr = ["view", "inner" , "engine", "more"];//图集名
                //得到当前的图集序号
                var _ablumidx = arr.indexOf(state.nowAlbum);
                //让序号加1
                var _prevAlbumidx = _ablumidx - 1 > 0 ?  _ablumidx - 1 : 3 ;
                //变图集
                commit("changeNowAlbum" , {"nowAlbum" : arr[_prevAlbumidx]});
                commit("changeNowIdx" , {"nowIdx" : state.carinfo.images[state.nowAlbum].length - 1})
            }
        }
    }
}



