<template>
    <div>
        <header @touchstart="back">
            <span></span>
            <span>{{headerTitle}}</span>
        </header>

        <nav>
            <ul class="nav-top" ref="Box">
                <li :class="this.topIndex == 0 ? 'topActive' : 'top-item'" @touchstart="top(0)">今日排名</li>
                <li :class="this.topIndex == 1 ? 'topActive' : 'top-item'" @touchstart="top(1)">本周排名</li>
                <li :class="this.topIndex == 2 ? 'topActive' : 'top-item'" @touchstart="top(2)">本月排名</li>
            </ul>

            <ul class="nav-bottom">
                <li :class="this.bottomIndex == 0 ? 'bottomActive' : 'top-item'" @touchstart="bottom(0)">全部</li>
                <li :class="this.bottomIndex == 1 ? 'bottomActive' : 'top-item'" @touchstart="bottom(1)">魔法斗气</li>
                <li :class="this.bottomIndex == 2 ? 'bottomActive' : 'top-item'" @touchstart="bottom(2)">魔法校园</li>
                <li :class="this.bottomIndex == 3 ? 'bottomActive' : 'top-item'" @touchstart="bottom(3)">亡灵异族</li>
            </ul>
        </nav>

        <!--<section>
            <div class="content">
                <div class="content-left">
                    <img src="" alt="">
                </div>

                <div class="content-right">
                    <h4>不喝维他必须死 <span>完本</span></h4>

                    <div>作者  订阅21万  收藏10万</div>

                </div>
            </div>
        </section>-->

        <loading v-show="loading"></loading>

        <div class="bottom" >
            <div class="bottom_list" v-for="(book,index) in books" :key="index">

                <div class="bottom_list_left">
                    <router-link :to="{ path: '/BookDetail/' + book.book_name}">
                        <img :src="book.book_img" @error="loadImage($event)">
                    </router-link>
                </div>

                <div class="bottom_list_right">
                    <div class="bottom_list_right_name"><p>{{book.book_name}}</p></div>
                    <div class="bottom_list_right_detail"><img src="../../../static/images/CityImgs/bookhead@2x.png"><div class="bottom_list_right_author">{{book.author}}</div><span>订阅21万</span><span>收藏10万</span></div>
                    <div class="bottom_list_right_introduction"><p>{{book.book_synopsis}}</p></div>
                    <div class="bottom_list_right_span">
                        <span>{{headerTitle}}</span>
                        <span>搞笑</span>
                        <span>热血</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Loading from '../Loading/Loading.vue'

    export default {
        name: "cityClassify",

        data(){
            return {
                loading:false,
                dataList:[],
                ifActive:false,
                topIndex:0,
                bottomIndex:0,
                books:[],
                id:0,
                page:1,
                headerTitle:''
            }
        },

        created(){
            this.id = this.$route.params.cid;
            this.getData(this.id,this.page);

            /*传过来的是字符串需要转型*/
            this.headerTitle = this.title(this.$route.params.cid*1)
        },

        mounted(){
            // this.headerTitle = this.title(this.$route.params.cid);
            /*函数防抖动*/
            window.addEventListener('scroll',
                this.debounce(this.handleScroll, 500)
            );
        },

        methods:{
            getData(id,page) {
                this.loading = true;
                axios.get('http://xs.0359you.com/index/index/get_book_list.html?class_id='+this.id+'&page='+this.page).then((res)=>{
                    let datas = res.data.redata.book_list

                    for (let i = 0; i < datas.length; i++) {
                        const argument = datas[i];

                        // console.log(argument);
                        argument.author = argument.author.slice(3)
                        this.books.push(argument)
                    }

                    this.loading = false;
                })
            },
            top(index){
                this.topIndex = index;
            },

            bottom(index){
                this.bottomIndex = index;
            },

            back(){
                this.$store.state.isBack = true

                this.$router.go(-1)
            },

            handleScroll(){
                let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

                /*可视区域高*/
                let seeHeight = window.screen.height;

                /*文档高*/
                let pageHeight = document.body.scrollHeight;

                /*头部高*/
                // let headerTop = this.$refs.Box.offsetTop;


                if(pageHeight - seeHeight - scrollTop <= 200){
                    this.page++;

                    this.getData(this.id,this.page)
                }

                /*let count = this.$refs.Box.children.length-1;

                let lastBox = this.$refs.Box.children[count];
                // console.log(lastBox.offsetTop);
                //
                // console.log(pageHeight);

                if(scrollTop+seeHeight-lastBox.offsetTop>=0){
                    this.page++;

                    this.getData(this.id,this.page)
                }*/

                // console.log(count);
            },

            /*函数防抖*/
            debounce (fn, idle) {
                let setTm;
                if (!idle || idle <= 0) return fn;
                return function () {
                    clearTimeout(setTm);
                    setTm = setTimeout(fn.bind(this, ...arguments), idle);
                }
            },

            loadImage(e) {
                this.common.defaultImage(e)
            },

            title(classID) {

                switch (classID) {
                    case 1:
                        return '玄幻';
                        break;
                    case 2:
                        return '仙侠';
                        break;
                    case 3:
                        return '都市';
                        break;
                    case 4:
                        return '历史';
                        break;
                    case 5:
                        return '网游';
                        break;
                    case 6:
                        return '科幻';
                        break;
                    case 7:
                        return '其他';
                        break;
                    default:
                        return '分类'
                }
            }
        },

        components: {Loading}
    }
</script>

<style scoped>
    /*头部*/
    header {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        background: #fff url("../../../static/images/CityImgs/back.png") no-repeat 1rem center/.65rem 1rem;
    }



    header span:nth-of-type(2){
        text-align: center;
        /*margin-right: 8rem;
        margin-left: .6rem;*/
        font-size: 1rem;
        color: #1c1c1c;
    }

    /*导航*/
    .nav-top,.nav-bottom {
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ddd;
        color: #616161;
        font-size: .8rem;
        background-color: #f6f7fa;
    }

    .nav-top li {
        font-size: .9rem;
        color: #616161;
        padding: .5rem 0;
    }

    .nav-top li.topActive{
        color:#00bc7e;
        background: url("../../../static/images/CityImgs/topbg.png") no-repeat 0 bottom/100% .2rem;
    }

    .nav-bottom li {
        font-size: .8rem;
        color: #3b3c3c;
        padding: .2rem .8rem;
        border: 1px solid #00bc7e;
        border-radius: 1rem;
    }

    .nav-bottom li.bottomActive{
        color:#fff;
        /*border-bottom: .15rem solid #00bc7e;*/
        background-color: #00bc7e;
    }


    /*内容*/

    .bottom{
        display: flex;
        /*justify-content: center;*/
        flex-direction: column;
        align-items: center;
        background-color: #fff;
    }
    .bottom_list{
        width: 18.24rem;
        height: 9.867rem;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        /*background-color: #f00;*/
    }
    .bottom_list_left{
        width: 5.067rem;
        height: 7.013rem;
    }

    .bottom_list_left img{
        width: 100%;
        height: 100%;
    }
    .bottom_list_right{
        padding: 0 0.72rem;
        width: 13.173rem;
        height: 7.013rem;
        display: flex;
        flex-direction:column;
        align-items: flex-start;
        justify-content: space-between;
    }
    .bottom_list_right_name{
        width: 13.173rem;
        height: 1rem;
        line-height: 1rem;
        overflow: hidden;
    }
    .bottom_list_right_name p{
        font-size: 0.853rem;
        color: #101010;
    }
    .bottom_list_right_detail{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin-top: 0.5rem;
    }
    .bottom_list_right_detail img{
        width: 0.8rem;
        height: 0.8rem;
        /*margin-right: 0.3rem;*/
    }

    .bottom_list_right_detail span{
        font-size: 0.64rem;
        color: #8a8a8a;
    }
    .bottom_list_right_author{
        display: block;
        position: relative;
        top: 0;
        left: 0.2rem;
        width: 5rem;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        font-size: 0.747rem;
        color: #8a8a8a;
        text-align: left;
    }
    .bottom_list_right_introduction{
        width: 11.733rem;
        height: 2.56rem;
        /*超出部分显示省略号*/
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    .bottom_list_right_introduction p{
        font-size: 0.72rem;
        color: #8a8a8a;
        line-height: 1.227rem;
    }
    .bottom_list_right_span span{
        font-size: 0.693rem;
        color: #5f5f5f;
        margin-right: 0.64rem;
        background-image: url("../../../static/images/CityImgs/label_01@2x.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        padding: 0.3rem;
    }

</style>