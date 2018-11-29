<template>
    <div>
        <input type="file" ref="file" @change="changeUp" hidden multiple />
        <!-- <Button>上传图片</Button> -->
        <h2>请上传汽车外观图<em>最多可上传10张</em></h2>
        <div class="upbox" ref="upbox">
            <Picgrid v-for="item in ImgFiles" :file="item" :key="item.id"></Picgrid>
            <div class="btn" @click="choosePic"></div>
        </div>
        
    </div>
</template>

<script>
import Picgrid from "./Picgrid";//图片上传组件
    export default {
        data() {
            return {
                //待上传的所有图片
                ImgFiles: []
            }
        },
        mounted(){
            // 被拖动的对象进入其容器范围内时触发此事件
            this.$refs.upbox.addEventListener("dragenter",function(e){
                e.preventDefault();
                $('.upbox').addClass("on");
            },false)
            // 被拖动的对象在另一对象容器范围内拖动时触发此事件
            this.$refs.upbox.addEventListener("dragover",function(e){
                e.preventDefault();
            },false)
            // 被拖动的对象离开其容器范围内时触发此事件
            this.$refs.upbox.addEventListener("dragleave",function(e){
                e.preventDefault();
                $('.upbox').removeClass("on");
            },false)
            var self = this;//鼠标释放是 异步，所以要备份
            // 在一个拖动过程中，释放鼠标键时触发此事件
            this.$refs.upbox.addEventListener("drop",function(e){
                e.preventDefault();
                $('.upbox').removeClass("on")
                console.log(e.dataTransfer.files);
                self.ImgFiles.push(...e.dataTransfer.files)
            } ,false);
            $(this.$refs.upbox).sortable();//拖拽排序

        },
        methods: {
            //当input 改变的时候
            changeUp(){
                var ImgFiles = this.$refs.file.files;
                //往数组中push一项file文件
                for (let i = 0; i < ImgFiles.length; i++) {
                    this.ImgFiles.push(ImgFiles[i])
                } 
            },
            //点按钮 上传图片
            choosePic(){
                //模拟触发事件
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click",false,false);
                this.$refs.file.dispatchEvent(evt);
            }
        },
        components : {
            Picgrid
        }
    }
</script>

<style scoped lang="less">
h2{
    margin-top:10px;
    em{font-style: normal;font-size: 14px;color:#ccc;margin-left:10px;font-weight: normal}
}
.upbox{
    margin-top:20px;padding:10px 0px 10px 10px;min-height:120px;border:1px dashed #ddd;transition:all .4s ease 0s;display:flex;flex-wrap:wrap;;
    &.on{border:1px dashed #ccc;background:#eee}
    &::after{content: '';display:block;clear: both;}
    .btn{
        width:140px;height: 180px;border:1px dashed #ddd;position: relative;transition:all .4s ease 0s;
        &::after{
            content: "+";
            font-size: 80px;
            font-weight: bold;
            text-align: center;
            position: absolute;
            width: 100%;
            height: 100%;
            line-height: 150px;
            color: #ddd;
        }
        &:hover{background:#eee;}
    }
}
</style>