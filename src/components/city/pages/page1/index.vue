<template>
    <div div class="page page1">
        <loading v-show="loading"></loading>

        <!--导航样式-->
        <nav >
            <div class="nav-slider" @touchstart="doThis($event)" @touchend="doThis($event)">

                <mt-swipe :auto="1000">
                    <mt-swipe-item>
                        <img src="../../../../../static/images/CityImgs/slider.jpg" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../../../../static/images/CityImgs/slider.jpg" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../../../../static/images/CityImgs/slider.jpg" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>

            <div class="nav-bottom">
                <ul class="nav-bottom-content">
                    <router-link to="/city/cityClassify"><li>分类</li></router-link>
                    <router-link to="/city/cityClassify"><li>排行</li></router-link>
                    <router-link to="/city/cityClassify"><li>试读</li></router-link>
                    <router-link to="/city/cityClassify"><li>连载</li></router-link>
                    <router-link to="/city/cityClassify"><li>完本</li></router-link>
                </ul>
            </div>
        </nav>

        <!--书城内容样式-->
        <section>

            <div class="content-top">
                <span>小编推荐</span>
                <span>更多&gt;</span>
            </div>

            <div class="content-middle">

                <div class="content-middle-item" v-for="item in dataList">
                    <router-link :to="{ path: '/BookDetail/' + item.book_name}">
                        <div class="item-top">
                            <img :src="item.book_img" alt="">
                        </div>

                        <div class="item-bottom">
                            {{item.book_name}}
                        </div>
                    </router-link>

                </div>




               <!-- <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>-->

            </div>
        </section>

        <section>
            <div class="content-top">
                <span>每日上新</span>
                <span>更多&gt;</span>
            </div>

            <div class="content-middle">

                <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>

                <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>


                <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>

                <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>

                <div class="content-middle-item">
                    <div class="item-top">
                        <img src="../../../../assets/logo.png" alt="">
                    </div>

                    <div class="item-bottom">
                        痴情总裁爱上我
                    </div>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import axios from 'axios'
    import Loading from '../../../Loading/Loading.vue'

    export default {
        name: "BooksCity",

        data(){
            return {
                imgs:'./logo.png',
                dataList:[],
                loading:false
            }
        },

        created(){
          this.getData()
        },

        mounted(){

        },

        methods:{
            /*阻止事件冒泡*/
            doThis($event) {
                $event.cancelBubble = true;
            },

            getData(){
                this.loading = true;
                axios.get('http://xs.0359you.com/index/index/get_book_list.html').then((res) => {
                    // console.log(res.data.redata.book_list);
                    this.loading = false;
                    this.dataList = res.data.redata.book_list;
                })
            }
        },

        components: {Loading}
    }
</script>

<style scoped>



    /*导航样式*/
    /*轮播图*/
    .nav-slider {
    }

    .mint-swipe {
        height: 8.3rem;
    }

    .mint-swipe-item img {
        width: 100%;
    }
    .mint-swipe-item {
        height: 8.3rem;
        width: 100%;
    }

    /*导航底部*/
    .nav-bottom {
        background-color: #fff;
        height: 4.8rem;
        line-height: 4.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .nav-bottom-content {
        height: 2.8rem;
        margin: 1.1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .nav-bottom-content a {
        height: 2.8rem;
        flex: 1;
        text-align: center;
        line-height: 2.8rem;
        font-size: 0.8rem;
    }

    .nav-bottom-content a li {
        color: #000;
        text-align: center;
        line-height: 2.8rem;
        font-size: 0.8rem;
    }

    .nav-bottom-content a li::before {
        content: '';
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        background-size:cover;
        margin-left: 1.4rem;
    }

    .nav-bottom-content a:nth-of-type(1) li::before{
        background: url("../../../../../static/images/CityImgs/classify.png") no-repeat center/100% 100%;
    }

    .nav-bottom-content a:nth-of-type(2) li::before{
        background: url("../../../../../static/images/CityImgs/rank.png") no-repeat center/100% 100%;
    }

    .nav-bottom-content a:nth-of-type(3) li::before{
        width: 1.6rem;
        height: 1.5rem;
        background: url("../../../../../static/images/CityImgs/read.png") no-repeat center/100% 100%;
    }

    .nav-bottom-content a:nth-of-type(4) li::before{
        background-image: url("../../../../../static/images/CityImgs/ser.png") ;
    }

    .nav-bottom-content a:nth-of-type(5) li::before{
        background-image: url("../../../../../static/images/CityImgs/end.png") ;
    }


    /*内容样式*/
    section {
        background-color: #fff;
        border-top: .6rem solid #f5f5f5;
        padding: .4rem .5rem;

    }

    section:last-child{
        margin-bottom: 2.8rem;
    }

    .content-top {
        padding: 0 .3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .content-top span:nth-of-type(1){
        font-size:.9rem;
        color:#1e1e1e;
        font-weight: 700;

    }

    .content-top span:nth-of-type(2){
        color: #6a6a6a;
        font-size: .75rem;
    }


    /*内容底部*/
    .content-middle {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

    .content-middle .content-middle-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 30%;
        margin-bottom: .3rem;
        height: 10rem;

    }

    .content-middle .content-middle-item .item-top {
        width: 100%;
        height: 8rem;
        margin-bottom: .3rem;
    }


    .content-middle .content-middle-item img {
        width: 100%;
        height: 100%;
    }


    .content-middle .content-middle-item .item-bottom{
        text-align: center;
        font-size: 0.8rem;
        color: #101010;
        line-height: .9rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

</style>
