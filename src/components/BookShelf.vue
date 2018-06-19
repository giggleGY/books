<template>
    <div>


        <!--头部-->
        <header>
            <div class="header-top" >
                <span @click="mask" class="add">
                    <ul class="maskBox" v-show="isShow">
                        <li><span> </span> 本机导入</li>
                        <li><span></span>WiFi传书</li>
                        <li @click="manageBook"><span></span>书籍管理</li>
                    </ul>
                </span>
                <span class="search"></span>
            </div>

            <div class="header-bottom">
                <div class="text">周阅读<span>60</span>分钟</div>
                <div class="button">签到</div>
            </div>
        </header>



        <div class="content">

            <div class="note" >
                我的笔记
            </div>

            <div class="item" @click="select(index,item.book_id)" v-for="(item,index) in dataList">
                <!--{{index}}{{item.id}}-->
                <!--<router-link :to="{path:'/BookDetail/Reader/'+ item.book_id}"><img :src="item.book_img" alt=""></router-link>-->

                <img :src="item.book_img" alt="">
            </div>

        </div>


        <div class="manage" v-if="isManage">
            <div @click="all">全选</div>
            <div @click="del">删除</div>
        </div>

        <!--蒙版-->
        <div class="mask" v-show="isShow" @click="mask" >

        </div>
    </div>



</template>

<script>
    import axios from 'axios'

    export default {
        name: "BookShelf",

        data(){
          return {
              isShow:false,
              isManage:false,
              dataList:[]
          }
        },

        created(){
            this.getData()
        },

        methods:{

            getData(){
                this.loading = true;
                axios.get('http://xs.0359you.com/index/index/get_book_list.html').then((res) => {
                    // console.log(res.data.redata.book_list);
                    this.loading = false;
                    this.dataList = res.data.redata.book_list;
                })
            },

            mask(){
                this.isShow = !this.isShow;
                // this.isShow = true;
            },

            /*书架管理*/
            manageBook(){
                this.isManage = !this.isManage;
                var oItem=document.querySelectorAll('.item');

                /*拿到所有的item通过类名切换显示选中图标*/
                for (let i = 0; i < oItem.length; i++) {
                    const oItemElement = oItem[i];
                    oItemElement.setAttribute('class','show item')
                }


            },

            /*选择对应书本*/
            select(index,id){
                /*非管理模式路由跳转*/
                if(!this.isManage){
                    this.$router.push({path:'/BookDetail/Reader/'+id})
                }


                /*进入管理模式*/
                if (this.isManage){
                    /*通过传值拿到指定item*/
                    var oItem=document.querySelectorAll('.item');

                    /*判断指定item是否有选中类*/
                    if((' '+oItem[index].className+' ').indexOf(' '+"select"+' ') > -1){
                        oItem[index].setAttribute('class','item show')
                    }else {
                        /*设置选中类名 切换选中背景*/
                        oItem[index].setAttribute('class','item show select')
                    }
                    /*console.log(index);
                    console.log(this.arr);*/
                }
             },

            /*全选*/
            all(){
                var oItem=document.querySelectorAll('.item');

                for (let i = 0; i < oItem.length; i++) {
                    const oItemElement = oItem[i];

                    oItemElement.setAttribute('class','show item select')

                }

            },

            /*删除*/
            del(){
                var content = document.querySelector('.content');

                var oItem=document.querySelectorAll('.item');

                var arr = [];

                for (var i = 0; i < oItem.length; i++) {
                    var oItemElement = oItem[i];

                    /*把具有选中类的item的id保存起来*/
                    if((' '+oItemElement.className+' ').indexOf(' '+"select"+' ') > -1){
                        arr.push(this.dataList[i].book_id)
                    }
                }

                console.log(arr);

                /*删除具有对应id的item,跟新数据数组*/
                this.dataList = this.dataList.filter(item=>{
                    if(arr.indexOf(item.book_id)==-1) return item;
                });

                console.log(this.arr);

                this.isManage = !this.isManage;

                for (let i = 0; i < oItem.length; i++) {
                    const oItemElement = oItem[i];
                    oItemElement.setAttribute('class','item')
                }
            }
         }
    }
</script>

<style scoped>
    /*头部样式*/
    header {
        height: 5rem;
        background: url("../../static/images/shelfImgs/bg.jpg") no-repeat center/cover;
        position: relative;
    }

    .header-top .add{
        display: block;
        width: 1rem;
        height: 1rem;
        background: url("../../static/images/shelfImgs/add.png") no-repeat center/cover;
        position: absolute;
        right: .8rem;
        top: .5rem;
    }

    .header-top .search{
        display: block;
        width: 1rem;
        height: 1rem;
        background: url("../../static/images/shelfImgs/search.png") no-repeat 0/cover;
        position: absolute;
        right: 3rem;
        top: .5rem;
    }

    .header-bottom .text{
        position: absolute;
        right: 35%;
        top: 55%;
        font-size: .8rem;
        /*color: #00bc7e;*/
        color: green;
    }

    .header-bottom .text span {
        font-size: 1.8rem;
    }

    .header-bottom .button {

        text-align: center;
        line-height: 1.9rem;
        color:#fff;
        position: absolute;
        right: 3%;
        top:50%;
        width: 5.1rem;
        height: 1.8rem;
        background:url("../../static/images/shelfImgs/button.png") no-repeat 0 0.1rem;
        background-size: 5.1rem 1.7rem;
        font-size: .6rem;
    }


    
    /*书架内容部分*/
    /*.content {
        border-top: 1px solid #ccc;
        border-radius: .2rem;
        padding-top: .2rem;
    }

    .books-top {
        height: 8rem;
        background: url("../../static/images/shelfImgs/booktop.png") no-repeat center/cover;
    }

    .books-top span{
        position: absolute;
        width: 2rem;
        height: .8rem;
        background: #fff url("../assets/images/shelfImgs/tuijian.png") no-repeat 0 0/cover;
        left: 0;
        top: .8rem;
    }

    .books-middle {
        height: 8rem;
        background: url("../assets/images/shelfImgs/booktop.png") no-repeat center/cover;
    }

    .books-bottom {
        height: 1rem;
        background: url("../assets/images/shelfImgs/bottomblock.png") no-repeat center/cover;
    }

    .item img {
        width: 94%;
        height: 95%;
    }

    .books-top .item,.books-middle .item {
        position: relative;
        width: 25%;
        height: 80%;
        float: left;
        margin-top:1.6rem;
        margin-left:1.1rem;
        padding-top: .4rem;
        background:  url('../assets/images/shelfImgs/bookbg.png') no-repeat 0 0/cover;
    }

    !*选中图标*!
    .books-middle .item::before,.books-top .item::before{
        content: '';
        position: absolute;
        right: .5rem;
        width: 1.2rem;
        height: 1.2rem;
        background:  url('../assets/images/shelfImgs/choose.png') no-repeat 0 0/cover;
        z-index: 9;
        display: none;
    }


    .books-middle .show::before,.books-top .show::before{
        display: block;
    }

    .books-middle .select::before,.books-top .select::before{
        background:  url('../assets/images/shelfImgs/choose02.png') no-repeat 0 0/cover;
    }
*/

    /*书架内容修改*/
    .content {
        margin-top: 0.01rem;
        padding: 0 .4rem;
        border-top: 1px solid #ccc;
        border-radius: .2rem;
        /*height: 32rem;*/
        background: url("../../static/images/shelfImgs/booktop.png") no-repeat 0rem -0.15rem/100% 8rem ,url("../../static/images/shelfImgs/bookli.png") repeat-y 0 8rem/100% 8rem;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-bottom: 3rem;
    }

    .item,.note{
        position: relative;
        width: 26%;
        height: 6.95rem;
        /*float: left;*/
        margin-top:1rem;
        /*margin-left:.1rem;*/
        padding-top: .26rem;
        /*padding-bottom: .4rem;*/
        background:  url('../../static/images/shelfImgs/bookbg.png') no-repeat 0 0/cover;
    }

    .note {
        padding: 1.2rem 0 0 .6rem;
        font-size: .8rem;
        color: #bbb;
        background: url('../../static/images/shelfImgs/notebg.png') no-repeat 0 0/96% 94%;
    }

    .item img {
        width: 96%;
        height: 94%;
    }

    .content .item::before{
        content: '';
        position: absolute;
        right: .5rem;
        width: 1.2rem;
        height: 1.2rem;
        background:  url('../../static/images/shelfImgs/choose.png') no-repeat 0 0/cover;
        z-index: 9;
        display: none;
    }

    .content .show::before {
        display: block;
    }

    .content .select::before{
        background:  url('../../static/images/shelfImgs/choose02.png') no-repeat 0 0/cover;
    }




    /*蒙版部分*/
    .header-top .maskBox{
        position: absolute;
        width: 6.8rem;
        height: 6.5rem;
        left: -530%;
        top:1.7rem;
        box-sizing: border-box;
        padding-top: .4rem;
        background:  url('../../static/images/shelfImgs/maskBox.png') no-repeat 0 0/cover;
        z-index: 999;
    }

    .maskBox li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 2rem;
        border-top: 1px solid #ccc;
        padding:1rem .5rem;
        box-sizing: border-box;
        color: #616161;
        font-size: .85rem;
    }

    .maskBox li:first-child{
        border-top:none;
    }


    .maskBox li span {
        width: 1rem;
        height: 1.1rem;
    }

    .maskBox li:nth-of-type(1) span{
        background:  url('../../static/images/shelfImgs/import.png') no-repeat 0 0/cover;
    }

    .maskBox li:nth-of-type(2) span{
        width: 1.1rem;
        height: 1rem;
        background:  url('../../static/images/shelfImgs/wifi.png') no-repeat 0 0/1.1rem 1rem;
    }

    .maskBox li:nth-of-type(3) span{
        background:  url('../../static/images/shelfImgs/guanli.png') no-repeat 0 0/cover;
    }



    .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 99;
    }


    /*管理底部*/
    .manage{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2.8rem;
        background-color: #fff;
        z-index: 99;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        color: #00bc7e;
        font-size: .8rem ;
    }


</style>