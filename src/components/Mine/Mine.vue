//登录

<template>
    <div class="Mine">
        <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
        <div class="log-bg">
            <div class="log-cloud cloud1"></div>
            <div class="log-cloud cloud2"></div>
            <div class="log-cloud cloud3"></div>
            <div class="log-cloud cloud4"></div>

            <div class="log-logo">Welcome!</div>
        </div>

        <button @click="register">跳转登录界面</button>
        <button @click="logout">退出登录</button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                account: '',
                password: ''
            }
        },
        methods: {

            //登录逻辑
            register() {
                console.log(1);
                this.$router.push({path:'/Mine/login'})
            },

            //登录请求
            toLogin() {

            },

            checkLogin() {
                //检查是否存在session
                if (!this.getCookie('session')) {
                    this.$router.push('/Mine/login');
                } else {
                    console.log(2);
                    this.$router.push('/Mine/Mine');
                }
            },

            logout(){
                //删除cookie并跳到登录页
                this.isLogouting = true;
                this.delCookie('session');

                //演示
                setTimeout(()=>{
                    this.$router.push('/Mine/login');
                    this.isLogouting = false;
                },1000)
            }
        },

        watch: {
            "$route": 'checkLogin'
        },
        created() {
            this.checkLogin();
        }

    }
</script>

<style scoped>


</style>
