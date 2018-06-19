<template>
  <div class="list-panel" @touchmove:prevent>
    <div class="list">
      <div class="list-nav">
        <i class="back" @click="hideListPanel"></i>
        <h3>目录</h3>
      </div>
      <div class="list-content" @touchmove:prevent>
        <ul>
          <li v-for="(item,index) in chapterList" @click="jumpTo(index)">{{index+1}}. {{item.chapter_name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import axios from 'axios'
  import {mapState} from  'vuex'

  export default {
    data() {
      return {
        chapterList: []
      }
    },
    /*props: {
      bookId: {
        type:String,
        required: true
      }
    },*/

    props:['bookId'],

    created() {
      this.getList()
    },

    watch:{
      bookId:{
          handler(newValue,oldValue){
            this.getList()
          }
      }
    },

    methods: {
      jumpTo(index) {
          if (index >= this.$store.state.lastChapter-1) {
              index = this.$store.state.lastChapter-1
          }
        this.$store.dispatch('curChapter',index)
        this.hideListPanel()
        this.$store.state.bar = false
        document.body.scrollTop = 0
      },
      hideListPanel() {
        this.$store.state.list_panel = false
      },
      getList() {
          /*组件创建后还没有拿到请求的id需要通过watch监听值再请求*/
          if(this.bookId){
              axios.get('http://xs.0359you.com/index/index/get_chapter_list.html?bid='+this.bookId).then((res) => {
                  this.loading = false  //获取数据完成后隐藏loading

                  // console.log(res.data.redata.chapter_list);
                  this.chapterList = res.data.redata.chapter_list;

                  this.$store.state.lastChapter = res.data.redata.chapter_list.length

              })
          }

      }
    }
  }
</script>

<style lang="less" type="text/less">
  .list-panel {
    position: fixed;
    transition: all .3s;
    left: 0;
    top: 0;
    bottom: 0;
    right: 2.667rem;
    z-index: 10;
    overflow: auto;
    transform: translateX(-100%);
    &.show {
      transform: translateX(0);
    }
    .list {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width:100%;
      background-color: #fff;
      opacity: 1;
      .list-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        height: 2.6rem;
        top: 0;
        left: 0;
        right: 2.6rem;
        color: #ed424b;
        background-color: #fff;
        border-bottom: 1px solid #ed424b;
        .back {
          position: absolute;
          left: .533rem;
          top: .533rem;
          width: 1.6rem;
          height: 1.6rem;
          background: url("../../../assets/images/back.png") no-repeat;
        }
        h3 {
          margin: auto;
        }
      }
      .list-content {
        background-color: #fff;
        margin-top:2.6rem;
        ul {
          padding: 0 .8rem;
        }
        li {
          color: #333;
          height: 2.5rem;
          line-height: 2.5rem;
          border-bottom: 1px solid #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
