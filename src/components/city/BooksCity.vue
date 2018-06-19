<template>
    <div class="big">
        <header ref="myHeader">
            <div class="content header-top">
                <!--<span class="header-left">排行</span>-->
                <input type="text" class="header-middle" placeholder="万古天帝">
                <!--<span class="header-right">分类</span>-->
                <span class="search"></span>
            </div>



            <div class="header-bottom">
                <div class="page-tab" ref="mybox">
                    <div
                            :class="nowPath == item.path ? 'tab-item tab-item_active' : 'tab-item'"
                            v-for='(item, index) in tabList'
                            :key="index">
                        <router-link
                                mode="out-in"
                                :to="item.path">{{item.name}}
                        </router-link>
                    </div>
                </div>
            </div>
        </header>



        <transition :name="slideDirection">
            <router-view/>
        </transition>
    </div>
</template>

<script>

    import Loading from '../Loading/Loading.vue'

    export default {
        name: "BooksCity",

        data() {
            return {
                tabList: [{
                    name: '今日推荐',
                    path: '/city/BooksCity/page1'
                }, {
                    name: '每日促销',
                    path: '/city/BooksCity/page2'
                }, {
                    name: '精选书单',
                    path: '/city/BooksCity/page3'
                }, {
                    name: '在线书院',
                    path: '/city/BooksCity/page4'
                }, {
                    name: '男生',
                    path: '/city/BooksCity/page5'
                }, {
                    name: '女生',
                    path: '/city/BooksCity/page6'
                }, {
                    name: '免费',
                    path: '/city/BooksCity/page7'
                }, {
                    name: 'VIP',
                    path: '/city/BooksCity/page8'
                }, {
                    name: '出版',
                    path: '/city/BooksCity/page9'
                }, {
                    name: '经典',
                    path: '/city/BooksCity/page10'
                }],

                tabSwiper: {},
                slideDirection: 'slideforward',
                nowPath: '',
                startX: '',
                startY: '',
                dist: 0
            }
        },

        mounted() {
            this.nowPath = this.$route.path;
            this.initTouchedEvent();
            // console.log(this.nowPath.slice(-1));
            /*刷新后导航位移对应的路由页面*/
            this.pageX(this.nowPath.slice(-1))
        },

        methods: {
            touchedstartHandler(e) {
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
            },
            touchendHandler(e) {
                let direction = this.startX - e.changedTouches[0].pageX;
                let directionY = this.startY - e.changedTouches[0].pageY;

                let nowRouteIndex = 0;
                /*拿到当前路由*/
                this.tabList.forEach((v, index) => {
                    if (v.path == this.nowPath) {
                        nowRouteIndex = index;
                    }
                });

                /*水平滑动距离是否大于竖直滑动距离*/
                var disXY = Math.abs(direction) > Math.abs(directionY);

                /*判断滑动距离大于150&&水平滑动大于垂直滑动当前路由是否为最后一个路由*/
                if (Math.abs(direction) > 120 && disXY && direction >= 0 && nowRouteIndex < this.tabList.length - 1) {
                    //设置向前动画
                    this.slideDirection = 'slideforward';
                    this.$router.push({'path': this.tabList[nowRouteIndex + 1].path});

                    this.pageX(nowRouteIndex, direction);

                }
                if (Math.abs(direction) > 120 && disXY && direction < 0 && nowRouteIndex > 0) {
                    //设置向后动画
                    this.slideDirection = 'slideback';
                    this.$router.push({'path': this.tabList[nowRouteIndex - 1].path});

                    this.pageX(nowRouteIndex, direction);
                }
            },
            initTouchedEvent() {
                this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
                this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
                // console.log(this.$el);
            },

            pageX(index, direction) {
                let mybox = this.$refs.mybox;

                /*左滑*/
                if (direction > 0) {
                    index = index + 2;

                    if (index > 8) return;
                    if (index > 4) {
                        this.dist = -(index - 2) * 5;
                        mybox.style.transform = 'translateX(' + this.dist + 'rem)'
                    }

                   /* console.log(index);
                    console.log(this.dist);*/
                }
                /*右滑*/
                else if (direction < 0) {
                    if (index > 8) return;

                    if (index > 2) {
                        this.dist = -(index - 2) * 5;
                        mybox.style.transform = 'translateX(' + this.dist + 'rem)'
                    }

                    if (index < 3) {
                        mybox.style.transform = 'translateX(0rem)'
                    }

                   /* console.log(index);
                    console.log(this.dist);*/
                }
                /*没传值刷新调用*/
                else if (direction == null) {
                    if (index > 8) {
                        mybox.style.transform = 'translateX(-30rem)'
                        return
                    }
                    ;
                    if (index > 2) {
                        this.dist = -(index - 2) * 5;
                        mybox.style.transform = 'translateX(' + this.dist + 'rem)'
                    }

                    if (index < 3) {
                        mybox.style.transform = 'translateX(0rem)'
                    }
                }


            }
        },

        watch: {
            '$route'(to, from) {
                this.nowPath = to.path;
                if(to.path == '/city/BooksCity/page1'){
                    this.$refs.mybox.style.transform = 'translateX(0rem)'
                }
            }
        }

    }
</script>

<style scoped>
    /*头部样式*/
    header {
        height: 4.589rem;
        width: 20rem;
        overflow: hidden;
        background-color: #fff;
        padding: 0.5rem 0;
        box-sizing: border-box;
    }

    .content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
    }

    .content .search {
        position: absolute;
        width: 1rem;
        height: 1rem;
        right: 1.85rem;
        top: .25rem;
        background: url("../../../static/images/CityImgs/search02.png") no-repeat center/.9rem;
    }

    .header-middle {
        margin: 0 15px;
        border-radius: 10px;
        width: 17.28rem;
        height: 1.5rem;
        outline: 0;
        font-size: .8rem;
        background-color: #e9e9e9;

    }

    /*占位符样式*/
    input::-webkit-input-placeholder {
        color: #7f7f7f;
        font-size: 0.8rem;
        text-align: center;
    }

    .header-bottom {
    }

    a {
        color: #333;
        text-decoration: none;
    }

    .page-tab {
        width: 50rem;
        font-size: .9rem;
        color: #5f5f5f;
        margin-top: .3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: all .5s;
    }

    .tab-item {
        flex: 1;
        width: 5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        margin: 5px 0;
    }

    .tab-item_active {
        border-radius: 50%;
        border-bottom: .2rem solid #00bc7e;
    }

    .tab-item_active a {
        color: #00bc7e;
    }

    .slideforward-enter-active, .slideforward-leave-active {
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }

    .slideforward-enter, .slideforward-leave-to {
        position: absolute;
        transform: translate(-20rem, 0px);
    }

    .slideback-enter-active, .slideback-leave-active {
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }

    .slideback-enter, .slideback-leave-to {
        position: absolute;
        transform: translate(-20rem, 0px);
    }

</style>
