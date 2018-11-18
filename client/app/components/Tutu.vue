<template>
    <div>
        <div v-if="isLoaded">
            <img :src="picurl" :style="{'width' : w +'px','height' : h + 'px'}" />
        </div>
        <div v-else class="loadingbox" :style="{'width': w+'px','height': h+'px','position':'relative','line-height':h+'px'}">
            <img :style="{'width':w/2 +'px'}" src="/images/load.svg" />
        </div>
    </div>
</template>

<script>
    export default {
        props : ["picurl" , "w" , "h"],
        data(){
            return {
                isLoaded: false,
            }
        },
        // 组件加载完毕，调用自己的函数
        created() {
            this.loadPic();
        },
        methods: {
            loadPic() {
                var img = new Image();//创建一个图片对象
                img.src = this.picurl;
                //监听是否加载完毕
                var self = this;
                img.onload = function(){
                    self.isLoaded = true;
                }
            }
        },
        watch : {
            //当picurl 改变的时候
            picurl(){
                this.isLoaded = false;
                this.loadPic();//加载图片
            }
        }
    }
</script>

<style scoped lang="less">
    .loadingbox{
        text-align: center
    }
</style>