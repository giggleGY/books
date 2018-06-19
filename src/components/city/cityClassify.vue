<template>
    <div class="container">
        <div class="top">
            <img src="../../../static/images/CityImgs/back.png"@touchstart="back">
            分类
        </div>
        <div class="bottom">
            <div class="list" v-for="(list,index) in fenlei" :key="index">
                <router-link :to="{path:'/city/classDetail/'+list.class_id}" class="routerlink">
                    <img :src="imgs[index]">
                    <span>{{list.class_name}}</span>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "fenlei",
        data() {
            return {
                fenlei: [],
                imgs:["../../../static/images/classify/novel_01@2x.png","../../../static/images/classify/novel_02@2x.png","../../../static/images/classify/novel_03@2x.png","../../../static/images/classify/novel_04@2x.png","../../../static/images/classify/novel_05@2x.png","../../../static/images/classify/novel_06@2x.png","../../../static/images/classify/novel_07@2x.png"]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            back() {
                this.$router.go(-1)
                this.$store.state.isBack = true;
            },
            getData() {
                axios.get('http://xs.0359you.com/index/index/get_class_list.html').then((res) => {
                    // console.log(res.data.redata)
                    for (var i = 0; i < res.data.redata.length; i++) {
                        this.fenlei.push(res.data.redata[i])
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 20rem;
        height: 41rem;
        background-color: #fff;
    }
    
    .top {
        width: 100%;
        height: 2.667rem;
        line-height: 2.667rem;
        font-size: 1.013rem;
        text-align: center;
        border-bottom: 2px solid #efefef;
    }

    .top img {
        width: 0.7rem;
        height: 1.013rem;
        position: relative;
        left: -7rem;
        top: 0.1rem;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .bottom .routerlink {
        display: flex;
    }

    .bottom .list {
        height: 2.987rem;
        line-height: 2.987rem;
        margin: 2.453rem 2.5rem 0 2.053rem;
    }

    .bottom .list img {
        width: 2.267rem;
        height: 2.987rem;
        background-color: black;
    }

    .bottom .list span {
        font-size: 1.013rem;
        color: #5b5b5b;
        margin-left: 0.5rem;
    }
</style>
