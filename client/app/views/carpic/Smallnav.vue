<template>
    <div v-if="carinfo.images" @mouseleave="backtopage()">
        <div class="train" :style="{'left': -310 * page + 'px'}">
            <!-- <ul v-for="i in totalPages">
                <li v-for="j in 6" :class="{'cur': nowIdx == (i-1)*6+(j-1)}">
                     <img :src="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowAlbum}/${getImgName(i, j)}`" />
                    
                    {{carinfo.images[nowAlbum][(i-i)*6+(j-1)]}}
                </li>
            </ul> -->

            <ul v-for="i in totalPages" style="margin-bottom:20px;">
                <li v-for="j in 6" v-if="getImgName(i, j)" :class="{'cur' : nowIdx == (i - 1) * 6 + (j - 1)}" @click="changeIdx((i - 1) * 6 + (j - 1))">
                    <Tutu :picurl="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowAlbum}/${getImgName(i,j)}`" :w="140" :h="93"></Tutu> 
                </li>
             </ul> 
        </div>
        <div class="nav">
            <span v-for="i in totalPages" :style="{'width':299 / totalPages + 'px'}" @mouseenter="changePage(i-1)" :class="{'cur' : page == i - 1}"></span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    // 当前汽车信息
    carinfo() {
      return this.$store.state.carpicStore.carinfo;
    },
    //当前的图集名字
    nowAlbum() {
      return this.$store.state.carpicStore.nowAlbum;
    },
    //当前图集显示的第几张
    nowIdx() {
      return this.$store.state.carpicStore.nowIdx;
    },
    //总页数
    totalPages() {
      return Math.ceil(this.carinfo.images[this.nowAlbum].length / 6);
    }
  },
  methods: {
    //得到 i j 这个图片的图片名
    getImgName(i, j) {
      return this.carinfo.images[this.nowAlbum][(i - 1) * 6 + (j - 1)];
    },
    //改变page
    changePage(n) {
      this.page = n;
    },
    //鼠标离开的事件监听
    backtopage(){
        this.page = parseInt(this.nowIdx / 6)
    },
    changeIdx(n){
        this.$store.commit("carpicStore/changeNowIdx" , {"nowIdx" : n})
    }
  },
  watch : {
    //当全局的nowidx 变换的时候，要改变一下 局部page
      nowIdx(){
          this.page = parseInt(this.nowIdx / 6)
      }
  }
};
</script>

<style scoped lang="less">
.train {
  width: 12000px;
  position: relative;
  padding-top: 20px;
  transition: all 0.4s ease 0s;
  ul {
    width: 299px;
    float: left;
    list-style: none;
    margin: 0px 10px 20px 0px;
    li {
      width: 49%;
      height: 93px;
      margin: 0px 2% 10px 0px;
      float: left;
      position: relative;
      
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        transition: all 0.4s ease 0s;
      }
      &.cur::before{
          background:none;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    li:nth-child(even) {
      margin-right: 0px;
    }
  }
}
.nav {
  span {
    height: 15px;
    float: left;
    background: #6d5609;
    border-right: 5px solid #000;
    &:last-child {
      border: none;
    }
    &.cur {
      background: orange;
    }
  }
  &:after {
    contain: "";
    display: block;
    clear: both;
  }
}
</style>