<template>
<div class="verify-phone">
    <div class="user-icon"><img src="./user.png"></div>
    <div class="phone-number"><img src="./login.png"><input type="tel" placeholder="请输入手机号码" v-model="phoneNumber"></div>
    <div class="password"><img src="./password.png"><input type="password" placeholder="请输入密码" v-model="password"></div>
    <!-- <div class="user-agreement">我已阅读并同意<b>居分期用户协议</b></div> -->
    <div class="submit" v-bind:class="{'active':isTruePhoneNum()}" v-tap="isTruePhoneNum()?gotoVerify():return;">登 录</div>
    <div class="register" v-tap="gotoRegister()">注 册</div>

</div>
<verify v-if="inVerify"></verify>
<div class="mask" v-if="inVerify"></div>
<loading :show="loading" text="请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import Loading from 'vux-components/loading'
import axios from 'axios'
export default {
    data() {
        return {
            phoneNumber: "",
            password: "",
            loading: false
        }
    },
    components: {
        Loading
    },
    methods: {
        isTruePhoneNum() {
            let reg = /^1[3|4|5|7|8]\d{9}$/
            return (reg.test(String(this.phoneNumber)) && this.password)
        },
        gotoVerify() {
            this.loading = true
            axios.post(`${Lib.C.userApi}auth/login`, {}, {
                params: {
                    account: this.phoneNumber,
                    password: this.password,
                    type: 8
                },
                withCredentials: true,
                responseType: true
            }).then((res) => {
                let data = res.data.data
                //data.loginAt = new Date().getTime()
                //data.expiredAt = String(Number(data.loginAt) + Number(data.expiresIn * 1000 - 60 * 1000 * 100))
                //alert(JSON.stringify(data));
                if(-1 == data.authorities.indexOf('ROLE_SERVICE_MANAGER')){
                    localStorage.setItem('service-manager-register', JSON.stringify(data))
                    location.href = './registerComplete.html'
                }
                else{
                    localStorage.setItem('user', JSON.stringify(data))
                    location.href = './index.html'
                }

            }).catch((err) => {
                alert("登录失败")
                this.loading = false
                throw err
            })
        },
        gotoRegister() {
            location.href = './register.html'
        }
    }
}
</script>

<style scoped lang="less">
body {
    background-color: #eee;
    position: relative;
}
.user-icon {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    top: 60px;
    left: 50%;
    margin-left: -40px;
    overflow: hidden;
    img {
        height: 100%;
        width: 100%;
    }
}
.user-name {
    position: absolute;
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #393939;
    left: 0;
    top: 130px;
}
.phone-number {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    height: 44px;
    width: calc( ~"100% - 30px" );
    top: 206px;
    left: 15px;
    img {
        position: absolute;
        width: 20px;
        height: 24px;
        top: 11px;
        left: 15px;
    }
    input {
        position: absolute;
        border: 0;
        background-color: #fff;
        top: 0;
        left: 59px;
        padding: 0;
        height: 44px;
        width: calc(~"100% - 65px");
        line-height: 44px;
        font-size: 16px;
        color: #999;
    }
}

.password {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    height: 44px;
    width: calc( ~"100% - 30px" );
    top: 266px;
    left: 15px;
    img {
        position: absolute;
        width: 20px;
        height: 24px;
        top: 11px;
        left: 15px;
    }
    input {
        position: absolute;
        border: 0;
        background-color: #fff;
        top: 0;
        left: 59px;
        padding: 0;
        height: 44px;
        width: calc(~"100% - 65px");
        line-height: 44px;
        font-size: 16px;
        color: #999;
    }
}
.user-agreement {
    position: absolute;
    width: calc(~"100% - 30px");
    height: 12px;
    line-height: 12px;
    left: 15px;
    top: 260px;
    color: #999;
    font-size: 12px;
    b {
        font-weight: normal;
        color: #3BA794;
    }
}
.submit {
    position: absolute;
    border-radius: 5px;
    background-color: #e2e2e2;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    height: 44px;
    width: calc(~"100% - 30px");
    left: 15px;
    top: 374px;
}

.register {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #88C928;
    font-size: 16px;
    color: #88C928;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    height: 44px;
    width: calc(~"100% - 30px");
    left: 15px;
    top: 434px;
}

.active {
    background-color: #88C928!important;
}
.mask {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 20;
    background-color: rgba(0,0,0,.7);
    top: 0;
    left: 0;
}
</style>
