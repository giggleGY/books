<template>
    <div class="register" id="register">
        <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
        <div class="log-bg">
            <div class="log-cloud cloud1"></div>
            <div class="log-cloud cloud2"></div>
            <div class="log-cloud cloud3"></div>
            <div class="log-cloud cloud4"></div>

            <div class="log-logo">Welcome! register</div>
        </div>

        <form action="http://xs.0359you.com/index/login/register.html">
            <input type="text" name="phone" placeholder="手机号" v-model="phone">
            <input type="text" name="login_password" placeholder="密码">
            <input type="text" name="login_password_confirm" placeholder="重复密码">
            <input type="text" name="phone_code" placeholder="验证码">
            <button @click="getCode">获取验证码</button>
            <input type="submit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "register",

        data(){
            return {
                phone:18677391364

            }
        },

        created(){

        },

        methods:{
            getCode() {
                axios.get('http://xs.0359you.com/index/login/send_code_sms.html?phone' + this.phone).then((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>