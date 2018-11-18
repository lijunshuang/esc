
export default {
    namespaced :true,
    state: {
        a:10,
        columnname : "", //栏目名称
        col2ndname: "", //二级栏目名称
    }, //同步语句
    mutations : {
        changeColumnName(state, {cn}){
             state.columnname = cn;
        },
        change2NdName(state, {cn}){
            state.col2ndname = cn;
        }
       
    },//异步语句
    actions : {

    }
}

