<template>
<div class="verify-phone">
    <div class="user-icon"><img src="./user.png"></div>
    <div class="merchant">
        <v-select :value.syc="selected" :options="options" placeholder="请输入您所在的门店"></v-select>
    </div>
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
import merchantName from "./merchantName.js"


export default {
    data() {
        return {

            loading: false,
            selected:null,
            options: merchantName
        }
    },
    components: {
        Loading, vSelect
    },
    methods: {
        gotoSubmit() {
            alert("提交成功")
            location.href = './registerComplete.html'
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


.merchant {
    position: absolute;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    width: calc( ~"100% - 30px" );
    top: 206px;
    left: 15px;
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
