<template>
    <div>
        <Layout :style="{padding: '20px 24px'}">
            <Card>
                <Steps :current="step - 1">
                    <Step :title="showTitle(1)" content="请填写基本信息"></Step>
                    <Step :title="showTitle(2)" content="上传汽车图片"></Step>
                    <Step :title="showTitle(3)" content="第三步"></Step>
                    <Step :title="showTitle(4)" content="第四步"></Step>
                </Steps>
            </Card>
            
            <Card style="margin-top:20px;">
                <div :is="'Step'+step"></div>
            </Card>
        </Layout>
        
    </div>
</template>

<script>
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
    export default {
        data() {
            return {
                
            }
        },
        computed : {
            step(){
                return this.$store.state.saleStore.step;
            }
        },
        methods: {
            //
            showTitle(n) {
                if (n == this.step) {
                    return "进行中"
                } else if(n < this.step){
                    return "已完成"
                } else if(n > this.step){
                    return "待进行"
                }
            }
        },
        components : {
            Step1,
            Step2,
            Step3,
            Step4
        }
    }
</script>

<style scoped>

</style>