
export default {
    namespaced : true,
    state : {
        step : 2, //当前显示的地几步
    },
    mutations : {
        changeStep(state, {step}){
            state.step = step;
        }
    },
    actions : {

    }
}