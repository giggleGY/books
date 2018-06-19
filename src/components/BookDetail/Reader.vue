<template>
  <div id="reader">
    <top-nav></top-nav>
    <div class="read-container" :bg="bg_color" :night="bg_night" ref="fz_size">
      <h4>{{title}}</h4>
      <div class="chapterContent" v-show="!loading"  v-html="content">
        <!--<p v-for="(c,i) in content" :key="i">{{c}}</p>-->
        <!--{{content}}-->

        <!--<transition :name="slideDirection">-->
          <!--<div class="chapterContent" v-show="!loading"  v-html="content"></div>-->
        <!--</transition>-->
      </div>
      <div class="btn-bar" v-show="!loading">
        <ul class="btn-tab">
          <li class="prev-btn" @click="prevChapter">上一章</li>
          <li class="next-btn" @click="nextChapter">下一章</li>
        </ul>
      </div>
    </div>
    <div class="page-up" @click="pageUp()"></div>
    <div class="click-mask" @click="clickBar"></div>
    <div class="page-down" @click="pageDown()"></div>
    <div class="top-nav-pannel-bk font-container" v-show="font_panel"></div>
    <font-nav></font-nav>
    <bottom-nav></bottom-nav>
    <!--<transition name="fade">-->
    <cover :class="{hide:!list_panel}"></cover>
    <list-panel :class="{show: list_panel}" :bookId="$route.params.bid"></list-panel>
    <Loading v-show="loading"></Loading>
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import axios from 'axios'
  import localEvent from '../../store/local'
  import TopNav from './TopNav/TopNav'
  import BottomNav from './BottomNav/BottomNav.vue'
  import FontNav from './FontNav/FontNav.vue'
  import ListPanel from './ListPanel/ListPanel.vue'
  import Cover from './Cover.vue'
  import Loading from '../Loading/Loading.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        bar: false,
        timer: null,
        title: '',
        content: [],
        loading: false,
        showList: false,
        booksReadInfo: {},
        lastChapter:1
      }
    },

    components: {
      TopNav,
      BottomNav,
      FontNav,
      ListPanel,
      Cover,
      Loading
    },
    created() {

        //判断本地是否存储了阅读器文字大小
      if (localEvent.StorageGetter('fz_size')) {
        this.$store.state.fz_size = localEvent.StorageGetter('fz_size')
      }
      //判断本地是否存储了阅读器主题色
      if (localEvent.StorageGetter('bg_color')) {
        this.$store.state.bg_color = localEvent.StorageGetter('bg_color')
      }

      //加载时从localStorage中回去所有数据阅读进度
      const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')
      let id = this.$route.params.bid;


        //当前书籍以前读过并有阅读进度
        if (localBookReaderInfo && localBookReaderInfo[id]) {
            this.booksReadInfo = localEvent.StorageGetter('bookreaderinfo');

            /*传入ID 和之前阅读到的章节列表索引*/
            this.getData(id, this.booksReadInfo[id].chapter)
            this.$store.dispatch('curChapter', this.booksReadInfo[id].chapter)
        } else {
            //当前书籍没有读过但是localStorage保存了其他书籍进度
            if (localBookReaderInfo) {
                this.booksReadInfo = localBookReaderInfo
                this.getData(id, 0)
                this.$store.dispatch('curChapter', 0)
            } else {  //第一次进入阅读
                this.booksReadInfo[id] = {
                    book: id,
                    chapter: 0
                }
                this.getData(id, 0)
                this.$store.dispatch('curChapter', 0)
            }
        }
    },
    mounted() {
      //因为要获取dom元素，所以不能放到created中
        this.$refs.fz_size.style.fontSize = this.fz_size + 'px'
        this.initTouchedEvent()
    },

    methods: {
      //切换上下工具栏，如果字体面板显示点击也关闭
      clickBar() {
        this.$store.dispatch('toggleBar')
        this.$store.state.font_panel = false
      },
      //向上翻页
      pageUp() {
        let target = document.body.scrollTop - window.screen.height - 80
        this.startScroll(target, -20)
      },
      //向下翻页
      pageDown() {
        let target = document.body.scrollTop + window.screen.height - 80
        this.startScroll(target, 20)
      },
      startScroll(target, speed) {
        let times = null
        times = setInterval(function () {
          if (speed > 0) {
            if (document.body.scrollTop <= target) {
              document.body.scrollTop += speed
            }
            if (document.body.scrollTop > target || document.body.scrollTop + window.screen.height >= document.body.scrollHeight) {
              clearInterval(times)
            }
          } else {
            if (document.body.scrollTop >= target) {
              document.body.scrollTop += speed
            }
            if (document.body.scrollTop < target || document.body.scrollTop <= 0) {
              clearInterval(times)
            }
          }
        }, 1)
      },
        getData(id,chapter) {
        this.loading = true

        /*axios.get(`${this.common.api}/book?book=${id}&id=${chapter}`).then((data) => {
          this.loading = false  //获取完毕后隐藏动画
          this.title = data.data.title
          this.content = data.data.content.split('-')
        })*/


          axios.get('http://xs.0359you.com/index/index/get_chapter_list.html?bid='+id).then((res) => {
              this.loading = false  //获取数据完成后隐藏loading

              this.title = res.data.redata.chapter_list[chapter].chapter_name;

              let cid = res.data.redata.chapter_list[chapter].chapter_id;


              this.lastChapter = res.data.redata.chapter_list.length;


              axios.get('http://xs.0359you.com/index/index/get_chapter_con.html?cid=' + cid).then((res) => {
                  // console.log(res.data.redata.con);
                  this.content = res.data.redata.con
              })
        })

        this.$store.state.windowHeight = window.screen.height
      },
      prevChapter() {
        /*在计算之前判断*/
        if(this.curChapter<=0) Toast('已经不能再翻页啦');
        this.$store.dispatch('prevChapter');
        this.saveBooksInfo();
        setTimeout(() => {
          document.body.scrollTop = 0
        }, 300)
      },
      //更换章节时保存阅读进度到localStorage
      nextChapter() {

        if(this.curChapter>=this.lastChapter-1) Toast('已经不能再翻页啦');

        this.$store.dispatch('nextChapter',this.lastChapter);

        this.saveBooksInfo();

        setTimeout(() => {
          document.body.scrollTop = 0
        }, 300)
      },
      saveBooksInfo() {
        //可用localStorage保存每本小说阅读进度
        let id = this.$route.params.bid;
        this.booksReadInfo[id] = {
          book: id,
          chapter: this.curChapter
        }
        localEvent.StorageSetter('bookreaderinfo', this.booksReadInfo)
      },
      page(e) {
        if (e.keyCode === 39) {
          // console.log(this.nextChapter)
          this.nextChapter()
        } else if (e.keyCode === 37) {
          this.prevChapter()
        }
      },

      touchedstartHandler(e) {
          this.startX = e.changedTouches[0].pageX;
          this.startY = e.changedTouches[0].pageY;
      },
      touchendHandler(e) {
          let direction = this.startX - e.changedTouches[0].pageX;
          let directionY = this.startY - e.changedTouches[0].pageY;

          /*水平滑动距离是否大于竖直滑动距离*/
          var disXY = Math.abs(direction) > Math.abs(directionY);

          /*判断滑动距离大于150&&水平滑动大于垂直滑动当前路由是否为最后一个路由*/
          if (Math.abs(direction) > 120 && disXY && direction >= 0) {
              //设置向前动画
              // this.slideDirection = 'slideforward';
              // this.$router.push({'path': this.tabList[nowRouteIndex + 1].path});
              // console.log('left');
              this.nextChapter()
          }
          if (Math.abs(direction) > 120 && disXY && direction < 0) {
              //设置向后动画
              // this.slideDirection = 'slideback';
              // this.$router.push({'path': this.tabList[nowRouteIndex - 1].path});
              this.$store.state.isBack = true;

              this.prevChapter()
              // this.$router.go(-1);
              // console.log('right');
          }
      },

     initTouchedEvent() {
         this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
         this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
         // console.log(this.$el);
     }
  },
    computed: {
      ...mapState([
        'font_panel', 'bg_color', 'fz_size', 'bg_night', 'curChapter', 'windowHeight', 'list_panel'
      ])
    },
    watch: {
      //监听fz_size的值更改背景色
      fz_size(val, oldVal) {
        this.$refs.fz_size.style.fontSize = val + 'px'
        localEvent.StorageSetter('fz_size', val)
      },

      //监听当前章节的改变，保存到本地并获取数据
      curChapter(val, oldVal) {
        localEvent.StorageSetter('cur_chapter', val)
        this.saveBooksInfo()
        this.getData(this.$route.params.bid, val)
      },
    }
  }
</script>

<style lang="less" type="text/less">
  .read-container {
    font-size: .9rem;
    color: #555;
    line-height: .8rem;
    min-height: 600px;
    padding: .8rem;
    h4 {
      position: fixed;
      top: 0;
      width: 100%;
      /*left: .9rem;
      right: .9rem;*/
      height: 3.2rem;
      line-height: 3.2rem;
      font-size: 1.1rem;
      color: #736357;
      /*border-bottom: solid 1px #736357;*/
      margin: 0 0 .2rem 0;
      letter-spacing: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /*p {
      text-indent: 2em;
      margin: 0.5em 0;
      text-align: justify;
      letter-spacing: 0px;
      line-height: 1.5;
    }
    p:first-of-type {
      margin-top: 43px;
    }*/
    .btn-bar {
      z-index: 80;
      width: 80%;
      margin: 1.067rem auto 0;
      max-width: 800px;
      .btn-tab {
        padding-left: 0;
        height: 1.8rem;
        line-height: 2rem;
        background-color: #000;
        border-radius: .5rem;
        border: 1px solid #858382;
        font-size: .75rem;
        opacity: 0.9;
        li {
          list-style-type: none;
          display: inline-block;
          width: 49%;
          text-align: center;
          color: #fff;
          &:nth-child(1) {
            border-right: 1px solid #858382;
          }
        }
      }
    }
  }

  .bac(@color) {
    background-color: @color;
  }

  .read-container[bg='1'] {
    .bac(#e9dfc7);
    h4 {
      .bac(#e9dfc7);
    }
  }

  .read-container[bg='2'] {
    .bac(#e7eee5);
    h4 {
      .bac(#e7eee5);
    }
  }

  .read-container[bg='3'] {
    .bac(#a4a4a4);
    h4 {
      .bac(#a4a4a4);
    }
  }

  .read-container[bg='4'] {
    .bac(#cdefcd);
    h4 {
      .bac(#cdefcd);
    }
  }

  .read-container[bg='5'] {
    .bac(#283548);
    h4 {
      .bac(#283548);
    }
  }

  .read-container[bg='6'] {
    .bac(#0f1410);
    h4 {
      .bac(#0f1410);
    }
  }

  .read-container[night='true'] {
    .bac(#0f1410);
    h4 {
      .bac(#0f1410);
    }
  }

  .page-up {
    position: fixed;
    width: 100%;
    height: 35%;
    top: 0;
    color: rgba(0, 0, 0, .1);
    z-index: 5;
  }

  .click-mask {
    position: fixed;
    width: 100%;
    height: 30%;
    top: 35%;
    color: rgba(0, 0, 0, .1);
  }

  .page-down {
    position: fixed;
    width: 100%;
    height: 35%;
    bottom: 3.467rem;
    color: rgba(0, 0, 0, .1);
    z-index: 5;
  }

  .top-nav-pannel-bk {
    position: fixed;
    bottom: 3.7rem;
    height: 7.2rem;
    background: #000;
    width: 100%;
    color: #fff;
    opacity: 0.9;
    z-index: 10003
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .chapterContent {
    line-height: 1.8rem;
  }


  /*.slideforward-enter-active, .slideforward-leave-active {
    position: absolute;
    transition: all .5s;
    transform: translate3d(0px, 0px, 0px);
  }

  .slideforward-enter, .slideforward-leave-to {
    position: absolute;
    transform: translate3d(-20rem, 0px,0);
  }

  .slideback-enter-active, .slideback-leave-active {
    position: absolute;
    transition: all .5s;
    transform: translate3d(0px, 0px, 0px);
  }

  .slideback-enter, .slideback-leave-to {
    position: absolute;
    transform: translate3d(-20rem, 0px,0);
  }
*/

</style>
