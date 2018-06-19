<template>
  <div id="app">
    <!--书架底部样式-->
    <footer v-show="this.$store.state.footer">
      <!--mint-ui 渲染-->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item " to="/">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">书架</span>
        </router-link>
        <router-link class="mui-tab-item" to="/city/BooksCity">
          <span class="mui-icon mui-icon-email"></span>
          <span class="mui-tab-label">书城</span>
        </router-link>
        <router-link class="mui-tab-item" to="/BookClub/BookClub">
				<span class="mui-icon mui-icon-contact">
					<!--<span id="badge" class="mui-badge">1</span>-->
				</span>
          <span class="mui-tab-label">书友会</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Mine/Mine">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </footer>

    <!--<router-view/>-->

    <transition :name="transitionName">
      　　　　　　
      <router-view class="Router"></router-view>
      　　　　
    </transition>
  </div>
</template>

<!--router-link-exact-active-->
<script>
export default {
    name: 'App',

    data() {
        return {
            transitionName: 'slide-right'
        }
    },

    created(){
        var str =this.$route.path.slice(0, 19);
        console.log(str);
        if(str == '/BookDetail/Reader/'){
            this.$store.dispatch('FOOTER')
        }else {
            this.$store.state.footer = true;
        }
    },
    watch: {
        '$route'(to, from) {
           /* console.log(to.path);
            console.log(to.path.slice(0, -1));*/
            var str = to.path.slice(0, 19);
            if(str == '/BookDetail/Reader/'){
                this.$store.dispatch('FOOTER')
            }else {
                this.$store.state.footer = true;
            }


            /*console.log(to.path.slice(0,18));
            console.log(from.path.slice(0,11));
            console.log(this.$router.path);*/


            // let nowRouter = this.$router.path;
            // let isBack = this.$router.isBack ; //  监听路由变化时的状态为前进还是后退

            /*if(from.path.slice(0,11)=='/BookDetail'&&to.path.slice(0,18)!='/BookDetail/Reader'){
                this.$store.state.isBack = true
            }*/


            if (this.$store.state.isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
            this.$store.state.isBack = false;
        }
    }
}
</script>

<style>
  #app {
    overflow: hidden;
    background-color: #fff;
  }

  .Router {
    transition: all .5s ease;
    /*top: 40px;*/
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
