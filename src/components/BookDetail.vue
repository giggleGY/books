<template>
  <div class="book-detail">
    <loading v-show="loading"></loading>
    <div class="detail-content" v-if="bookDetail">
      <!--详情头部-->
      <div class="detail-header">
        <!--<header class="detail-top">
          <a @click="back"><i class="back"></i>
            <h2 class="detail-title">{{bookDetail.book_name}}</h2>
          </a>
          <router-link to="/" class="home-btn"><i class="iconfont icon-home"></i></router-link>
        </header>
-->

        <div class="detail-con" v-if="!loading">
          <div class="detail-img">
            <img :src="bookDetail.book_img" alt="" @error="loadImage($event)">
          </div>
          <div class="detail-main">
            <h3 class="name">{{bookDetail.book_name}} </h3>
            <p class="author">{{bookDetail.author}}     {{bookDetail.words_num}}字</p>
            <rate :score="4"></rate>
            <p>5贯/千字</p>
            <p class="type">分类：{{bookDetail.class_id}}</p>
            <!--<p class="word-count"></p>-->
            <!--<rate :score="bookDetail.ratings"></rate>-->
          </div>
        </div>

        <div class="header-middle">
              <div>
                35W+
                <p>
                    订阅
                </p>
              </div>
              <div>
                10W+
                <p>
                    打赏
                </p>
              </div>
              <div>
                1W+
                <p>
                  收藏
                </p>
              </div>
        </div>

        <div class="detail-intro">
          <p :class="{show3: !showmore}" @click="showmore = !showmore"><span>简介：</span>{{bookDetail.book_synopsis}}</p>
        </div>

        <div class="header-bottom">
          <span class="search" @click="searchList">
              查看目录
            <span>
              连载至
            </span>
          </span>

          <span class="right">
            16小时前更新
          </span>
        </div>

      </div>

      <section>
        <div class="title">
          精彩书评
        </div>
          <div class="comment">
              <div class="item">
                <div class="left">
                  <div>
                    <img src="../assets/logo.png" alt="">
                  </div>

                </div>

                <div class="right">
                  <div class="top"> <span class="name">春夏秋冬又一春</span>  <span class="time">2018/5/19</span></div>
                  <div class="bottom">现在在等更新，好像快点看到最新的章节啊哎哎哎aaaaaaaaaaaa</div>
                </div>
              </div>


            <div class="item">
              <div class="left">
                <div>
                  <img src="../assets/logo.png" alt="">
                </div>

              </div>

              <div class="right">
                <div class="top"> <span class="name">春夏秋冬又一春</span>  <span class="time">2018/5/19</span></div>
                <div class="bottom">现在在等更新，好像快点看到最新的章节啊哎哎哎</div>
              </div>
            </div>
          </div>
      </section>

      <section>
        <div class="title">
          相似推荐
        </div>

        <div class="book-like">
          <div class="book-item">
            <div class="item-top">
              <img :src="bookDetail.book_img" alt="" @error="loadImage($event)">
            </div>

            <div class="item-bottom">
              {{bookDetail.book_name}}
            </div>
          </div>


          <div class="book-item">
            <div class="item-top">
              <img :src="bookDetail.book_img" alt="" @error="loadImage($event)">
            </div>

            <div class="item-bottom">
              {{bookDetail.book_name}}
            </div>
          </div>

          <div class="book-item">
            <div class="item-top">
              <img :src="bookDetail.book_img" alt="" @error="loadImage($event)">
            </div>

            <div class="item-bottom">
              {{bookDetail.book_name}}
            </div>
          </div>
        </div>

      </section>

      <footer>
        <div class="footer">
          <div >加入书架</div>
          <div  :class="{active: ifActive}" @touchstart="openBook"><router-link :to="{path:'/BookDetail/Reader/'+ bookDetail.book_id}">免费试读</router-link></div>
          <div >下载</div>
        </div>
      </footer>
    </div>

    <list-panel :class="{show: list_panel}" :bookId="bookDetail.book_id"></list-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import axios from 'axios'
  // import Similar from './Similar.vue'
  import defaultImage from '@/assets/utils.js'
  import Rate from '@/components/BookDetail/rate/rate'
  import Loading from './Loading/Loading.vue'
  import ListPanel from './BookDetail/ListPanel/ListPanel.vue'

  export default {
    data() {
      return {
        loading: false,
        // content: null,
        bookDetail: {},
        likes: [],  //相似推荐
        showmore: false, //简介显示更多
        ifActive:false,
        showList: false
      }
    },
    created() {
      // this.getBookDetail(this.$route.params.id)
      //   console.log(this.$route.params.book_name);
        this.getBookDetail(this.$route.params.book_name)
    },

    mounted(){
        this.initTouchedEvent()
    },

    methods: {
      getBookDetail(book_name) {
          this.loading = true;
          /*axios.get(`${this.common.api}/booklist?id=${bookId}`).then((res) => {
            this.loading = false  //获取数据完成后隐藏loading
            this.showmore = false  //获取数据让介绍最多显示5行
            this.bookDetail = res.data
            this.likes = res.data.like.split('-')
          })*/
        // this.bookDetail = {name:'www',images:'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg',author:'eee',type:'rrr',id:30,intro:'hahaha',wordcount:23,ratings:4.8}

          axios.get('http://xs.0359you.com/index/index/get_book_list.html?book_name='+book_name).then((res) => {
          // axios.get('http://xs.0359you.com/index/index/get_book_list.html?book_name=我在异界搞发明').then((res) => {
              this.loading = false  //获取数据完成后隐藏loading
              this.showmore = false  //获取数据让介绍最多显示5行
              this.bookDetail = res.data.redata.book_list[0];
              /*console.log(this.bookDetail.author);
              console.log(this.bookDetail.author.slice(3));*/
              // console.log(this.bookDetail);
              this.bookDetail.author = this.bookDetail.author.slice(3);

              this.bookDetail.words_num = this.bookDetail.words_num.slice(3);

              this.bookDetail.class_id = this.title(this.bookDetail.class_id );

              console.log(this.bookDetail.book_id);


              /*this.bookDetail.length =
              console.log(this.bookDetail.class_id);*/
              /*console.log(res);
              console.log(res.data.redata.book_list[0]);
              console.log(this.bookDetail.book_id);*/
          })
          this.loading = false
      },
      //打开书籍
      openBook() {
        this.$store.state.bar = false;
        this.ifActive = true;
      },

      //图片加载失败是使用默认图片
      loadImage(e) {
        this.common.defaultImage(e)
      },
     title(classID) {
         switch (classID) {
             case 1:
                 return '玄幻'
                 break
             case 2:
                 return '仙侠'
                 break
             case 3:
                 return '都市'
                 break
             case 4:
                 return '历史'
                 break
             case 5:
                 return '网游'
                 break
             case 6:
                 return '科幻'
                 break
             case 7:
                 return '其他'
                 break
             default:
                 return '分类'
         }
      },

      searchList(){
          this.$store.dispatch('showListPanel')
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
              /*this.slideDirection = 'slideforward';
              this.$router.push({'path': this.tabList[nowRouteIndex + 1].path});*/
              console.log('left');
          }
          if (Math.abs(direction) > 120 && disXY && direction < 0 ) {
              //设置向后动画
              /*this.slideDirection = 'slideback';
              this.$router.push({'path': this.tabList[nowRouteIndex - 1].path});*/
              this.$store.state.isBack = true;
              this.$router.go(-1);
              console.log('right');
          }
      },

      initTouchedEvent() {
          this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
          this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
          // console.log(this.$el);
      },


    },
    computed: {
      ...mapState([
        'curBookDetailId','list_panel'
      ])
    },
    // components: {Similar, Rate, Loading},
    components: { Rate, Loading,ListPanel},
    watch: {
      //监听路由，点击底部喜欢的书籍路由会改变，重新获取数据
      $route(to, from) {
        this.getBookDetail(to.params.id)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .ell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .book-detail {
    padding-bottom: 2rem;
    background-color: #fff;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*详情头部*/
  .detail-header {

    padding: 0 1.1rem;


    .detail-con {
      display: flex;
      padding: .7rem 0 .8rem;
      /*background-color: green;*/
      .detail-img {
        width: 5.5rem;
        height: 7.2rem;
        padding-left: .1rem;
        padding-top: .08rem;
        background: url("../../static/images/detail/bookbg2.png");
        img {
          width: 99%;
          height: 99%;
        }
      }
      
      .detail-main {
        margin-left: 1.4rem;
        flex: 1;
        h3 {
          margin-top: .3rem;
          margin-bottom: .4rem;
          font-size: 1rem;
          color: #343434;
          .ell;
        }
        p {
          margin: .5rem 0 0 0;
          font-size: .6rem;
          /*line-height: 1.8;*/
          color: #5f5f5f;
          line-height: 1rem;
          .ell;
        }
      }
    }

    .header-middle {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: .9rem;
      color: #5f5f5f;

      p {
        font-size: .6rem;
        color:#000;
        text-align: center;
        line-height: 1rem;
      }
    }

    .header-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .6rem 0;

      .search{
        font-size: .9rem;

        span{
          font-size: .7rem;
          color: #595959;
          margin-left: .2rem ;
        }
      }

      .right{
        font-size: .5rem;
        color: #00bc7e;
      }
    }
  }
    /*.read-btn {
      display: flex;
      > div {
        flex: 1;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        &:first-child {
          margin-right: 15px;
        }
        button {
          display: block;
          margin: 0 auto;
          width: 100%;
          height: 33px;
          line-height: 33px;
          font-size: 15px;
          vertical-align: middle;
          border: none;
          border-radius: 3px;
        }
        &:first-of-type {
          button {
            background-color: #ed424b;
            a {
              color: #fff;
            }
          }
        }
        &:nth-child(2) {
          button {
            color: #333;
            background-color: #fff;
            border: 1px solid #ddd;
          }
        }
      }
    }
  }

  .home-btn {
    padding: 15px 15px 0 0;
    .iconfont {
      font-size: 22px;
      color: #ed424b;
    }
  }*/

  .detail-intro {
    padding: .5rem 0;
    text-indent: 2em;
    line-height: 1.6;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    p.show3 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      font-size: .7rem;
      color: #5f5f5f;
      line-clamp: 3;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    span {
      color: #000;
    }
  }


  /*详情评论*/
  section {
    border-top: .4rem solid #eee;
    padding: 0 1.1rem;

    .title {
      font-size: .9rem;
      margin:.5rem 0;

    }

    .comment{

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /*background-color: #f00;*/
        margin-top: .5rem;

        .left {
          flex: 1;
          /*background-color: green;*/
          div {
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
            overflow: hidden;
            margin-left: .5rem;
            background-color: #ddd;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .right {
          flex: 5;
          .top {
            height: 1.7rem;
            display: flex;
            justify-content: space-between;
            font-size: .85rem;
            line-height: 1.7rem;

            .time {
              font-size: .65rem;
              color:#797979
            }
          }

          .bottom {
            font-size: .7rem;
            color:#797979;
            line-height: .8rem;
            
          }
        }

      }
    }

    /*相似推荐*/
    .book-like {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .book-item {
        flex: 1;
        margin-left: .2rem;
        font-size: .7rem ;
        text-align: center;
        margin-bottom: 3rem;

        .item-top {
          margin-bottom: .35rem;
          img {
            width: 100%;
            height: 100%;
          }
        }

      }
    }
  }

  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.7rem;
    background-color: #fff;
    z-index: 99;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #00bc7e;
    font-size: .85rem ;
    border-top: 1px solid #ddd;

    div{
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active a{
      color:#fff;
      background-color: #00bc7e;
    }

    a{
      color: #00bc7e;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 2.7rem;
    }
  }
  
</style>
