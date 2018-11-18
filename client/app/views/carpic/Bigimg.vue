<template>
    <div>
        <div class="Big_box">
            <div class="big_inner" ref="big_inner">
                <!-- 图片 -->
                <img ref="img" class="img">
                <!-- <img v-if="carinfo.images" :src="`http://127.0.0.1:3000/images/carimages/${id}/${nowAlbum}/${carinfo.images[nowAlbum][nowIdx]}`" /> -->
                <!-- loadingg 图 -->
                <img src="/images/load.svg" ref="loadingImg" class="loadingImg"/>
                <!-- 左右按钮 -->
                <button class="left" @click="goPrev()"></button>
                <button class="right" @click="goNext()"></button>
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        computed : {
            id(){
                return this.$route.params.id;
            },
            // 当前汽车信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            //当前的图集名字
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            },
            //当前图集显示的第几张
            nowIdx(){
                return this.$store.state.carpicStore.nowIdx;
            },
            
        },
        mounted() {
            var self = this;
            window.addEventListener("resize" , function(){
                self.setWidth()
            },true)
        },
        methods: {
            //下一张
            goNext(){
                this.$store.dispatch("carpicStore/goNext")
            },
            //上一张
            goPrev(){
                this.$store.dispatch("carpicStore/goPrev")
            },
            changePic(){
                //小图地址
                const smallpicurl = `http://127.0.0.1:3000/images/carimages_small/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                //大图地址
                const bigpicurl = `http://127.0.0.1:3000/images/carimages/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                //隐藏图片
                this.$refs.img.style.display = "none";
                //显示 loading图
                this.$refs.loadingImg.style.display = "block";
                // 小图的虚拟对象
                var smallImg = new Image();
                //小图的src路径
                smallImg.src = smallpicurl;
                // 大图的虚拟对象
                var bigImg = new Image();
                //小图的src路径
                bigImg.src = bigpicurl;
                //备份
                var self = this;
                // 监听小图加载完毕
                smallImg.onload = function(){
                    self.$refs.img.style.display = "block"; //显示图片
                    self.$refs.img.src = smallpicurl; //让图片显示为小图
                    self.$refs.loadingImg.style.display = "none";//loading 图隐藏
                }
                // 监听大图加载完毕
                bigImg.onload = function(){
                    self.$refs.img.src = bigImg.src; // 图片加载完毕
                    self.setWidth()
                }
            },
            setWidth(){
                var bigW = document.documentElement.clientWidth - 320;
                this.$refs.big_inner.style.width = bigW +'px';
                console.log(bigW);
                
            }
        },
        watch : {
            nowIdx (){
                this.changePic();
            },
            nowAlbum(){
                this.changePic()
            },
            carinfo(){
                this.changePic()
            }
        }
    }
</script>

<style scoped lang="less">
.Big_box{
    position: fixed;height: 100%;width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .big_inner{position: absolute;left:0px;}
    button{
        width:50%;height:100%;background:none;position: absolute;top:0px;border:none;
        &:focus{outline: none}
    }
    .loadingImg{position: fixed;top:0px;right:160px;z-index:999;max-height: 100%;}
    .img{width:100%;height: 100%;}
    .left{left:0px;cursor: url("//icon.zol.com.cn/article/slide2017/cursor_left.cur"),auto}
    .right{right:0px;cursor: url("//icon.zol.com.cn/article/slide2017/cursor_right.cur"),auto}
}
</style>