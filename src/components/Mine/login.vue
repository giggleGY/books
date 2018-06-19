//登录

<template>
    <div class="login" id="login">
        <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
        <div class="log-bg">
            <div class="log-cloud cloud1"></div>
            <div class="log-cloud cloud2"></div>
            <div class="log-cloud cloud3"></div>
            <div class="log-cloud cloud4"></div>

            <div class="log-logo">Welcome!</div>
        </div>

        <form action="	http://xs.0359you.com/index/login/login.html">
            <input type="text" name="phone" placeholder="手机号" v-model="account">
            <input type="text" name="login_password" placeholder="密码" v-model="password">
            <input type="button" @touchstart="login" value="login">
        </form>

        <!--<button @click="register">跳转注册界面</button>-->

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
            login(){
                if(this.account!='' && this.password!=''){
                    this.toLogin();
                    console.log(1);
                }
            },


            toLogin(){

                //一般要跟后端了解密码的加密规则
                //这里例子用的哈希算法来自./js/sha1.min.js
                // let password_sha = hex_sha1(hex_sha1( this.password ));

                //需要想后端发送的登录参数
                let loginParam = {
                    account: this.account,
                    // password_sha
                    password:this.password
                }

                //设置在登录状态

                //请求后端,比如:
                /*this.$http.post( 'example.com/login.php', {
                param: loginParam).then((response) => {
              if(response.data.code == 1){
                let expireDays = 1000 * 60 * 60 * 24 * 15;
                this.setCookie('session', response.data.session, expireDays);
                //登录成功后
                this.$router.push('/user_info');
              }
              }, (response) => {
                  //Error
              });
                */

                //演示用
                setTimeout(()=>{
                    //登录状态15天后过期
                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                    this.setCookie('session','blablablablabla...', expireDays);
                    // this.isLoging = false;
                    //登录成功后
                    console.log(2);
                    this.$router.push({path:'/Mine/Mine'});
                },1000)
            }

            /*//登录逻辑
            register() {
                this.$router.push({path:'/Mine/register'})
            },

            //登录请求
            login(e) {
                e.preventDefault();
                this.$router.replace({path:'/Mine/Mine'})
            }*/
        }
    }
</script>

<style scoped>


</style>
