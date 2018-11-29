<template>
    <div>
        <div v-drag-and-drop:options="options">
            <h4>备选</h4>
            <ul ref="list1" class="list1">
                <li v-for="item in unexist" :key="item.id" :data-e="item.e">{{item.c}}</li>
            </ul>
            <h4>当前设置</h4>
            <ul ref="list2" class="list2">
                <li v-for="item in exist" :key="item.id" :data-e="item.e">{{item.c}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
var allCols = [
    {'c': '发动机', 'e': 'engine'},
    {'c': '缩略图', 'e': 'avatar'},
    {'c': 'ID', 'e': 'id'},
    {'c': '颜色', 'e': 'color'},
    {'c': '品牌', 'e': 'brand'},
    {'c': '车系', 'e': 'series'},
    {'c': '价格', 'e': 'price'},
    {'c': '公里', 'e': 'km'},
    {'c': '排放', 'e': 'exhaust'},
    {'c': '燃料', 'e': 'fuel'},
    {'c': '变速箱', 'e': 'gearbox'},
    {'c': '购买日期', 'e': 'buydate'},
    {'c': '是否上牌', 'e': 'license'}
]
    export default {
        props: ["colSort"],
        data() {
            return {
                options : {
                    dropzoneSelector: 'ul',
                    draggableSelector: 'li',
                    excludeOlderBrowsers: true,
                    multipleDropzonesItemsDraggingEnabled: true,
                    showDropzoneAreas: true,
                    onDrop: function(event) {},
                    onDragstart: function(event) {},
                    onDragend: function(event) { }
                }
            }
        },
        computed : {
            exist(){
                var arr = [];
                allCols.forEach(item=>{
                    if(this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                })
                return arr;
            },
            unexist(){
                var arr = [];
                allCols.forEach(item=>{
                    if(!this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                })
                return arr;
            }
        },
    }
</script>

<style scoped lang="less">
h4{border-bottom: 1px solid #ddd;margin-bottom:10px;line-height:30px;}
ul{
    list-style: none;overflow: hidden;margin-bottom:0px;min-height:30px;
    li{
        float: left;padding: 3px 10px;border:1px solid #ddd;margin:0px 10px 10px 0px;transition:all .4s;cursor: pointer;
        &:focus{outline: none}
        &:hover{background:#eee;}
    }

}
</style>