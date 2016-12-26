<template>
<div class="verify-phone">
    <div class="complete-icon"><img src="./complete.jpg"></div>
    <div class="complete-text-top">注册完成</div>
    <div class="complete-text">
        <p>工作人员将在1-3个工作日内</p>
        <p>对您的注册信息进行审核</p>
        <p>审核完成之后将通过您的注册手机号</p>
        <p>与您联系,通知审核结果</p>
    </div>

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
    components: {
        Loading
    }
}
</script>

<style scoped lang="less">
body {
    background-color: #eee;
    position: relative;
}
.complete-icon {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 40px;
    top: 100px;
    left: 50%;
    margin-left: -40px;
    overflow: hidden;
    img {
        height: 100%;
        width: 100%;
    }
}
.complete-text-top {
    position: absolute;
    font-size: 18px;
    color: #393939;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    height: 44px;
    width: calc(~"100% - 30px");
    left: 30px;
    top: 220px;
}
.complete-text {
    position: absolute;
    font-size: 12px;
    color: #393939;
    text-align: center;
    line-height: 22px;
    height: 44px;
    width: calc(~"100% - 30px");
    left: 30px;
    top: 270px;
    p {
        margin-top: 0px;
        margin-bottom: 0px;

    }
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
