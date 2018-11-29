<template>
    <div class="box">
        <Row>
            <Col :span="8">
                <h4>共找到<span>{{total}}</span>辆车符合条件，共<span>{{Math.ceil(total/pagesize)}}</span>页，当前第<span>{{page}}</span>页 </h4>
            </Col>
            <Col :span="1" :offset="24-8-1">
                <Button type="primary" shape="circle" icon="ios-settings" @click="showLayer"></Button>
            </Col>
        </Row>

        <!-- {{row}} -->
        <Table stripe :columns="cols" :data="result" @on-sort-change="changeSort"></Table>
        <div style="height:10px;"></div>
        <Page :total="total" :page-size="pagesize" :current="page" show-sizer @on-change="changePage" @on-page-size-change="changePagesize"/>

        <!-- 模态框  用户自定义列-->
        <Modal
            v-model="model1"
            title="请更改表格列"
            @on-ok="ok"
            @on-cancel="cancel">
            <div ref="modelBox" v-if="model1">
                <SetColModel :colSort="colSort"></SetColModel>
            </div>
        </Modal>
    </div>
</template>

<script>
import colConfig from "./colConfig";
import SetColModel from "./SetColModel";//模态框组件
    export default {
        data (){
            return {
                colSort:["avatar" , "id" ,  "brand" , "series" , "price" , "km"],//列仓库
                cols : [], // 列的所有定义.引用  colConfig文件
                model1 : false
            }
        },
        //组件创建之后，根据列排序，从列的全部定义中 组建 cols，    可以用this了
        created() {
            this.setCols();
        },
        computed : {
            result(){
                return this.$store.state.findcarStore.result;
            },
            total(){
                return this.$store.state.findcarStore.total;
            },
            pagesize(){
                return this.$store.state.findcarStore.pagesize;
            },
            page(){
                return this.$store.state.findcarStore.page;
            }
        },
        methods: {
            changePage(page){
                this.$store.dispatch("findcarStore/changePage" , {page});
            },
            changePagesize(pagesize){
                this.$store.dispatch("findcarStore/changePagesize" , {pagesize});
            },
            changeSort({column , key , order}){
                this.$store.dispatch("findcarStore/changeSort" , {key , order});
            },
            ok(){
                // console.log($(this.$refs.modelBox).find("li").length);
                var arr = [];
                $(this.$refs.modelBox).find(".list2 li").each(function(){
                    arr.push($(this).attr('data-e'))
                })
                this.colSort = arr; //改列数据
                this.setCols();
                this.model1 = false; //关闭模态框
            },
            cancel(){
                this.model1 = false;
            },
            //点击显示模态框
            showLayer(){
                this.model1 = true;
            },
            setCols(){
                this.cols = [];
                for (let i = 0; i < this.colSort.length; i++) {
                    for (let j = 0; j < colConfig.length; j++) {
                        if (this.colSort[i] == colConfig[j].key) {
                            this.cols.push(colConfig[j])
                        } 
                    }
                    
                }
            }
        },
        components : {
            SetColModel
        }
    }
</script>

<style scoped lang="less">
h4{
    margin-bottom:0px;
    span{color:red;margin:0px 5px;}
}
    Button{margin-bottom:5px;}

.ivu-table-row td:first-child .ivu-table-cell{padding:5px 5px}
.td1{

    .ivu-table-cell{padding:0px 10px;}
}
</style>