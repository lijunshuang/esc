<template>
    <div>
       <Row>
           <Col :span="10" :offset="7">
                <Form ref="myfrom" :model="formData" :rules="rules" :label-width="120">
                    <FormItem label="车主姓名" prop="name">
                        <Input v-model="formData.name" placeholder="车主姓名"></Input>
                    </FormItem>
                    <FormItem label="身份证号码" prop="idcard">
                        <Input v-model="formData.idcard" placeholder="身份证号码"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                       <RadioGroup v-model="formData.sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="品牌和车系" prop="brandandseries">
                        <Cascader :data="brandOptions" v-model="brands"></Cascader>
                    </FormItem>
                    <FormItem label="颜色" prop="color">
                       <RadioGroup v-model="formData.color">
                            <Radio label="红"></Radio>
                            <Radio label="黄"></Radio>
                            <Radio label="蓝"></Radio>
                            <Radio label="白"></Radio>
                            <Radio label="黑"></Radio>
                            <Radio label="灰"></Radio>
                            <Radio label="绿"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="公里数" prop="km">
                        <Input v-model="formData.km" placeholder="请输入里程表上的公里数"></Input>
                    </FormItem>

                    <FormItem label="购买日期" prop="buydate">
                        <DatePicker v-model="formData.buydate"></DatePicker>
                    </FormItem>

                    <FormItem>
                        <Button @click="submit">确定</Button>
                    </FormItem>
                    
                </Form>
           </Col>
       </Row>
    
    </div>
</template>

<script>
    export default {
        data(){
            return {
               formData: {
                    name : '',
                    idcard : '',
                    sex : '',
                    brand: '',
                    series: '',
                    color : '',
                    km : '',
                    buydate : '',

               },
               rules: {
                   name: [
                       //必填
                        { required: true, message: '本项不能为空', trigger: 'blur' },
                        //字符串的正则
                        { type : "string" , pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请正确填写', trigger: 'blur'}
                    ],
                   idcard: [
                       //必填
                        { required: true, message: '本项不能为空', trigger: 'blur' },
                        //字符串的正则
                        // { type : "string" , pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请正确填写', trigger: 'blur'}
                    ],
                   sex: [
                       //必填
                        { required: true, message: '本项不能为空', trigger: 'blur' },
                    ],
                   brandandseries: [
                       //必填
                        //  { required: true, message: '本项不能为空', }
                    ],
                   color: [
                       //必填
                        { required: true, message: '本项不能为空', trigger: 'blur' },
                    ],
                   km: [
                       //必填
                        { required: true, message: '本项不能为空', trigger: 'blur' },
                        //字符串的正则
                        { type : "string" , pattern: /^\d+$/, message: '请输入数字', trigger: 'blur'}
                    ],
                   buydate: [
                       //必填
                        { required: true, message: '本项不能为空'},
                    ],
               },
               //品牌和车系 级联
               brandOptions: [{
                    value: 'A',
                    label: 'A',
                    children: [
                        {
                            value: '奥迪',
                            label: '奥迪',
                            children :[ 
                                {
                                    value: 'A4',
                                    label: 'A4',
                                },
                                {
                                    value: 'A5',
                                    label: 'A5',
                                },
                                {
                                    value: 'A6',
                                    label: 'A6',
                                },
                                {
                                    value: 'A8',
                                    label: 'A8',
                                },

                            ]
                        },
                        {
                            value: '奥迪1',
                            label: '奥迪1',
                            children :[ 
                                {
                                    value: 'A4',
                                    label: 'A4',
                                },
                                {
                                    value: 'A5',
                                    label: 'A5',
                                },
                                {
                                    value: 'A6',
                                    label: 'A6',
                                },
                                {
                                    value: 'A8',
                                    label: 'A8',
                                },

                            ]
                        },
                    ]
                },{
                    value: 'B',
                    label: 'B',
                    children: [
                        {
                            value: '宝马',
                            label: '宝马',
                            children :[ 
                                {
                                    value: 'X1',
                                    label: 'X1',
                                },
                                {
                                    value: 'X2',
                                    label: 'X2',
                                },
                                {
                                    value: 'X5',
                                    label: 'X5',
                                },
                            ]
                        },
                    ]
                }
               ]
            }
        },
        computed : {
            brands: {
                get(){
                    return []
                },
                set(v){
                    this.formData.brand = v[1];
                    this.formData.series = v[2];
                }
            },
        },
        methods: {
            submit (name) {
                this.$refs.myfrom.validate(data => {
                    // console.log(this.$store.state.saleStore.step);
                    if (data) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                    this.$store.state.saleStore.step ++;//进入下一步

                })
            },
        },
    }
</script>

<style scoped lang="less">
// .ivu-form-item{margin-bottom:20px;}
</style>