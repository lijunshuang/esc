
<template>
    <div>
        <div :class="{'picbox':true, 'done': percent==100 }" :style="{'width':picW+'px','height':picH+'px','background-image':`url(${picbase64})`}">
            <div class="progress">
                <span :style="{'width':percent+'%'}"><em>{{percent}}%</em></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["file"],
        data() {
            return {
                picW: 140,
                picH: 180,
                percent : 0,
                picbase64: "",
                picbase64Done: false,
            }
        },
        created() {
            var self = this;
            //创建预览图
            var fr = new FileReader();
            fr.readAsDataURL(this.file);
            //读取预览图成功
            fr.onload = function(e){
                self.picbase64 = e.srcElement.result;
                self.picbase64Done = true;
            }
           
            //创建虚拟表单
            var formData = new FormData();//封装文件数据
            formData.append("tupian", this.file);//
            //创建ajax对象
            var xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    console.log(xhr.responseText);
                }
            }
            //上传进度
            xhr.upload.onprogress = function(e){
                //e.loaded 是已经传输的字节，e.total是总字节
                self.percent = parseInt((e.loaded/e.total) * 100)
            }
            xhr.open("post" ,"/api/uppic",  true);
            xhr.send(formData);
        }
    }
</script>

<style scoped lang="less">
.picbox{
    position: relative;border: 1px solid #ddd;margin:0px 10px 10px 0px;flex:1;background-size:cover;background-position:center;transition:all .5s ease 0s;
    &::before{
        content: "";position: absolute;width: 100%;height: 100%;background:rgba(255,190,43,1);transition:all 0.4s ease 0s;
    }
    &.done::before{background:none;}
    .progress{
        position: absolute;width:90%;left:5%;top:50%;margin-top:-6px;background:black;border-radius:7px;overflow: hidden;
        span{
            height:12px;display: block;background:green;transition:all .4s ease 0s;text-align:right;
            em{position: relative;top:-4px;color:#fff;font-size:12px;}
        }
    }
    &.done .progress{display: none}
}
</style>