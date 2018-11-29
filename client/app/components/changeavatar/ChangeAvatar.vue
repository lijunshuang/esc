<template>
    <div>
        <Modal
            :value="true"
            title="更换头像"
            :width="modalW">
           
           <div v-if="step == 1">
               <input type="file" ref="file" hidden @change="changeHandler">
               <Button type="primary" @click="upBtn">请上传图片</Button>
           </div>
           <div v-if="step == 2">
               <Progress :percent="percent" />
           </div>
           <div v-if="step == 3">
               <div class="step3_box" :style="{'width':picW+paddingRight - 16 +'px','height':(picH > 300 ? picH : 300)+'px'}">
                   <CutPic :cutInfo="cutInfo" :picurl="picurl" :picW="picW" :picH="picH" :picRealW="picRealW" :picRealH="picRealH"></CutPic>
                   <!-- <img :src="picurl" :style="{'width':picW +'px','height':picH +'px'}"/> -->
               </div>
           </div>
           <div slot="footer">
               <Button @click="cancel">取消</Button>
               <Button type="primary" v-show="step == 3" @click="okHandler">确定</Button>
           </div>
        </Modal>
    </div>
</template>

<script>
import CutPic from "./CutPic";
import axios from "axios";
    export default {
        data() {
            return {
                step: 1,
                percent : 0,//上传进度
                picurl: "",
                picMinW:400,//图片最小宽
                picMaxW:700,//图最大宽
                picMinH:250,//图最小高
                picMaxH:390,// 图最大高
                paddingRight: 180,// 右边padding 放置预览图的位置
                picRealW: 0,// 图片真实宽（服务器返回的）
                picRealH: 0,//图片真实高（服务器返回的）
                picW: 0,//图片最终显示的宽
                picH: 0,//图片最终显示的高
                cutInfo : {
                    cut_rect_x: 0,
                    cut_rect_y: 0,
                    cut_rect_w: 60,
                    cut_rect_h: 60,
                }
            }
        },
        mounted (){
          this.setWH()  
        },
        methods: {
           okHandler(){
                // this.$emit('close');
                // this.$router.go(0);
                axios.post("/api/cut" , {
                    picurl : this.picurl,
                    cut_rect_x : this.cutInfo.cut_rect_x,
                    cut_rect_y : this.cutInfo.cut_rect_y,
                    cut_rect_w : this.cutInfo.cut_rect_w,
                    cut_rect_h : this.cutInfo.cut_rect_h,
                    picRealW : this.picRealW,
                    picRealH : this.picRealH,
                    picW : this.picW,
                    picH : this.picH
                });
                window.location.reload();// 刷新页面，可以关闭模态框
            },
            cancel() {
                this.$emit('close'); //像父组件 传值
            },
            upBtn(){
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click",false,false);
                this.$refs.file.dispatchEvent(evt);
            },
            //当input改变的时候
            changeHandler(){
                var theFile = this.$refs.file.files[0];
                var self = this;//备份
                //创建虚拟表单
                var form = new FormData();
                // 在虚拟表单中追加一个头像 项
                form.append("avatar" , theFile);
                //创建小黄人
                var xhr = new XMLHttpRequest();
                //回调
                xhr.onreadystatechange= function(){
                    if(xhr.readyState == 4){
                        // console.log(xhr.responseText);
                        var o = JSON.parse(xhr.responseText)
                        // console.log(o);
                        // self.picurl = "http://127.0.0.1:3000/" + o.filename;
                        self.picurl = o.filename;
                        self.picRealW = o.width;
                        self.picRealH = o.height;
                        self.setWH();
                    }
                }
                //上传进度
                xhr.upload.onprogress = function(e){
                    self.percent = parseInt((e.loaded/e.total)*100);
                    self.step = 3;//改变状态，试图就切换了
                }
                xhr.open("post" , "/api/upavatar" , true);
                xhr.send(form)
                this.step = 2;
            },
            //约束图片盒子的宽高
            setWH(){
                this.picW = this.picRealW;
                this.picH = this.picRealH;
                
                //如果图片返回的图片宽度大于限制图片的最大宽度
                if (this.picRealW > this.picMaxW) {
                    this.picW = this.picMaxW;
                    this.picH = this.picRealH / (this.picRealW / this.picMaxW);
                };
                if(this.picRealH > this.picMaxH){
                    this.picH = this.picMaxH;
                    this.picW = this.picRealW / (this.picRealH / this.picMaxH)
                console.log(this.picW, this.picH);
                }
            }
        },
        computed : {
            modalW(){
                if(!this.picurl){
                    return "500px";
                }
                return this.picW + this.paddingRight + "px"
            }
        },
        components : {
            CutPic
        }
    }
</script>

<style scoped>

</style>