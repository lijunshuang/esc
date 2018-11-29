<template>
    <div>
        <div class="cut_box" :style="{'width':picW +'px','height':picH +'px'}">
            <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{'width':picW +'px','height':picH +'px'}" />
            <!-- 遮罩 -->
            <div class="mask"></div>
            <!-- 裁切框 -->
            <div class="cut_rect" ref="cut_rect">
                <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{'width':picW +'px','height':picH +'px','left': -cutInfo.cut_rect_x -1 + 'px','top': -cutInfo.cut_rect_y -1 + 'px'}" />
                <div class="l"></div>
                <div class="t"></div>
                <div class="r"></div>
                <div class="b"></div>
            </div>

        </div>
        <!-- 预览图 -->
        <div class="pic_view">
            <div class="p_box" v-for="w in p_box_arr" :style="{'width':w +'px','height':w +'px'}">
                <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{
                    'left': -cutInfo.cut_rect_x/cutInfo.cut_rect_w * w + 'px',
                    'top': -cutInfo.cut_rect_y/cutInfo.cut_rect_h * w + 'px',
                    'width':picW/cutInfo.cut_rect_w * w +'px',
                    'height':picH/cutInfo.cut_rect_h * w +'px',
                    }" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["cutInfo" ,"picurl" ,"picW" ,"picH" ,"picRealW" ,"picRealH"],
        data() {
            return {
                //三个预览图的宽高
                p_box_arr: [120,90,60]
            }
        },
        mounted(){
            var self = this;
            //允许拖拽
            $(this.$refs.cut_rect).draggable({
                containment: "parent",//限制拖拽区域
                drag(event, ui){
                    // console.log(ui);
                    //得到方向框的left值和top值
                    var left = ui.position.left;
                    var top = ui.position.top;
                    //改变data
                    self.cutInfo.cut_rect_x = left;
                    self.cutInfo.cut_rect_y = top;
                }
            });
            //允许改变尺寸
            $(this.$refs.cut_rect).resizable({
                containment : "parent",//限制缩放区域
                aspectRatio : true, // 等比例
                resize(event, ui){
                    // console.log(ui);
                    var width = ui.size.width;
                    var height = ui.size.height;
                    //改变data
                    self.cutInfo.cut_rect_w = width;
                    self.cutInfo.cut_rect_h = height;
                }
            })
        }
    }
</script>

<style scoped lang="less">
.cut_box{
    position: relative;float:left;
    .mask{
        position: absolute;top:0px;left:0px;width:100%;height: 100%;background:rgba(0, 0, 0, .5)
    }
    .cut_rect{
        position: absolute;top:0px;left:0px;width:60px;height: 60px;overflow: hidden;z-index:99;
        img{position: relative;}
        &>div{
            position: absolute;
            &.l{width:0px;height:5000px;left:0px;top:0px;border-left:2px dashed #ddd;animation:move_l @time linear 0s infinite}
            &.r{width:0px;height:5000px;right:0px;top:0px;border-left:2px dashed #ddd;animation:move_r @time linear 0s infinite}
            &.t{height:0px;width:5000px;right:0px;top:0px;border-top:2px dashed #ddd;animation:move_t @time linear 0s infinite}
            &.b{height:0px;width:5000px;right:0px;bottom:0px;border-top:2px dashed #ddd;animation:move_b @time linear 0s infinite}
            
            @time : 140s;
            
            @-webkit-keyframes move_l{
                from{top:0px}
                to{top:-2500px;}
            }
            @-webkit-keyframes move_r{
                from{top:-2500px}
                to{top:0px;}
            }
            @-webkit-keyframes move_t{
                from{left:-2500px}
                to{left:0px;}
            }
            @-webkit-keyframes move_b{
                from{left:0px}
                to{left:-2500px;}
            }
        }
    }
}
.pic_view{
    width:160px;float:left;
    .p_box{
        border:1px solid #ddd;margin:0px 0px 15px 20px;overflow:hidden;
        img{position:relative}
    }
}

</style>