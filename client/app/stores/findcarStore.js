import axios from "axios";
import querystring from "querystring";

export default {
    namespaced :true,
    state: {
        filters : [
            // {
            //     "k":"price",
            //     "v":"3to9"
            // },
        ],
        page: 1,
        pagesize: 10,
        sortby : "id",
        sortdirection : 1,
        result : [],
        total : 0,
    },
    mutations : {
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        changeSort(state, {sortby, sortdirection}){
            state.sortby = sortby;
            state.sortdirection = sortdirection;
        },
        changeResult(state , {result}){
            state.result = result;
        },
        changeTotal(state , {total}){
            state.total = total;
        },
        // 罗列filter数组的操作(增 删 改)
        //增加过滤条件
        addFilter(state, {k, v}){
            state.filters.push({k , v})
        },
        //修改 v
        updateFilter(state, {k, v}){
            state.filters = state.filters.map(item => item.k == k ? {...item, v} : item)
        },
        delFilter(state, {k}){
            state.filters = state.filters.filter(item => item.k !=k);
        }
    },
    actions : {
        //拉取服务器的数据
        async fetchCar({commit , state}){
            const {page, pagesize, sortby, sortdirection, filters} = state;
            // 将filters数组变为对象
            var filterObj = {};
            for (let i = 0; i < filters.length; i++) {
                filterObj[filters[i].k] = filters[i].v
            }
            // 发出真正的请求
            const {total, result} = await axios.get("/api/findcar?" + querystring.stringify({
                page,
                pagesize,
                sortby,
                sortdirection,
                //展开filters 体
                ...filterObj
                })).then(data => data.data);
            //改变 results
            // console.log(total, result);
            commit("changeResult" , {result})
            commit("changeTotal" , {total})
        },
        //改变filter
        changeFilter({commit, state, dispatch}, {k,v}){
            // 判断是改  还是增加
            var isExist = false; //是否有，
            // 遍历state的filters数组，看到底有没有
            state.filters.forEach(item=>{
                if(item.k == k){
                    isExist = true;
                }
            });
            //如果这个k已经存在，那就是修改
            if(isExist){
                commit("updateFilter" , {k, v})
            }else{
                //如果不存在就是增加
                commit("addFilter" , {k, v})
            }
            commit("changePage", {"page": 1});
            //重新拉取数据
            dispatch("fetchCar")
        },
        //删除
        delFilter({commit, dispatch}, {k}){
            commit("delFilter" , {k});
            commit("changePage", {"page": 1});
            //重新拉取数据
            dispatch("fetchCar")
        },
        // 换页
        changePage({commit, dispatch}, {page}){
            //先改页码
            commit("changePage", {page});
            //改变
            dispatch("fetchCar")
        },
        // 换每页几条
        changePagesize({commit, dispatch}, {pagesize}){
            //先改页码
            commit("changePagesize", {pagesize});
            commit("changePage", {"page": 1});
            //改变
            dispatch("fetchCar")
        },
        // 改变排序
        changeSort({commit, dispatch}, {key, order}){
            //先改每页几条
            commit("changeSort", {"sortby": key, "sortdirection": order == "desc" ? -1 : 1});
            commit("changePage", {"page": 1});
            //改变
            dispatch("fetchCar")
        },

    }
}