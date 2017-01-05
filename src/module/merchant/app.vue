<template>
<div class="verify-phone">
    <div class="user-icon"><img src="./user.png"></div>
    <div class="merchant">
        <v-select multiple :on-change="consoleCallback" :options="options" placeholder="请输入您所在的门店"></v-select>
    </div>
    <div class="nickname"><img src="./login.png"><input type="text" placeholder="请输入用户昵称" v-model="nickname"></div>
    <div class="submit" v-tap="gotoSubmit()">提 交</div>

</div>
<verify v-if="inVerify"></verify>
<div class="mask" v-if="inVerify"></div>
<loading :show="loading" text="请稍候..."></loading>
</template>

<script>

import Lib from 'assets/Lib.js'
import Loading from 'vux-components/loading'
import axios from 'axios'
import vSelect from "vue-select"
import merchantName from "assets/merchantName.js"
import Verify from 'components/Verify'

export default {
    data() {
        return {
            loading: false,
            selected:null,
            nickname: "",
            options: [],
            selectedStores: [],
        }
    },
    components: {
        Loading, vSelect, Verify
    },
    ready() {
        axios.get(`${Lib.C.merApi}stores`, {
            params: {
                size: 1000
            }
        }).then((res) => {

            res.data.data.map((store) => {
                this.options.push({value: store.id, label: store.name})
            })

        }).catch((err) => {
            alert("获取门店失败，请稍候再试QAQ")
            throw err
        })
    },
    methods: {
        consoleCallback(val) {
            this.selectedStores = [];
            val.map((store) => {
                this.selectedStores.push(store.value)
            })
          //  alert(this.picked);
        },
        gotoSubmit() {
            this.loading = true
            axios.post(`${Lib.C.userApi}register/service-manager`,
                {
                    "mobile": localStorage.getItem('register-phoneNumber'),
                    "password": localStorage.getItem('register-password'),
                    "profile":{
                        "nickname": this.nickname,
                        "storeIds": this.selectedStores
                    }

                },
                {
                    withCredentials: true,
                    responseType: true

            }).then((res) => {
                let data = res.data.data
                //data.loginAt = new Date().getTime()
                //data.expiredAt = String(Number(data.loginAt) + Number(data.expiresIn * 1000 - 60 * 1000 * 100))
                //localStorage.setItem('service-manager', JSON.stringify(data))
                //alert(res.success)
                localStorage.setItem('service-manager-register', JSON.stringify(data))
                location.href = './registerComplete.html'
            }).catch((err) => {

                alert("注册失败: " + err.response.data.message)
                this.loading = false
                   location.href = './register.html'
                throw err
            })
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
.nickname {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    height: 34px;
    width: calc( ~"100% - 30px" );
    top: 206px;
    left: 15px;
    img {
        position: absolute;
        width: 15px;
        height: 18px;
        top: 11px;
        left: 15px;
    }
    input {
        position: absolute;

        background-color: #fff;
        top: 0;
        left: 59px;
        padding: 0;
        height: 33px !important;
        width: calc(~"100% - 65px");
        line-height: 34px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #d8d8d8 !important;
        border-top-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;

    }
}

.merchant {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    width: calc( ~"100% - 30px" );
    top: 266px;
    left: 15px;
    input {
        height: 44px !important;
    }

}

.isKeeper {
    position: absolute;
    top: 251px;
    left: 15px;

    label{
        padding-left:5px;
        margin-right:40px;
        font-size: 14px;
        color: #999;
    }

}



.submit {

    position: absolute;
    border-radius: 5px;
    background-color: #88C928;
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
