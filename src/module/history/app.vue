<template>
<div>
    <header>
        <tab active-color='#88C929' :index.sync="index">
            <tab-item active-class="tab-active" :selected="index === 0" v-tap="index = 0">已完成</tab-item>
            <tab-item active-class="tab-active" :selected="index === 1" v-tap="index = 1">已取消</tab-item>

        </tab>
    </header>

    <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-44-45+'px'" lock-x scroller-y v-ref:lista>
                    <div>
                        <no-data v-if="List0.length === 0"></no-data>
                        <div v-else v-for="order in List0">
                            <j-order-block :img="order.appt.customerImage" :time="getTime(order.appt.createdAt)" :name="order.appt.customerName" :tel="order.appt.customerMobile" :status="Status.zc[order.status].name"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="store">
                                <div class="store-line-1">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-tel"><img :src="telImg"></div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">{{order.brandName}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">正价金额</div>
                                    <div class="store-line-2-right">{{order.normalAmount|currency '￥' 2}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">特价金额</div>
                                    <div class="store-line-2-right">{{order.specialAmount|currency '￥' 2}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-right">总计:{{order.normalAmount+order.specialAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
        <swiper-item height="100%">
            <div class="tab-swiper vux-center content">
                <scroller :height="getScreenHeight()-44-45+'px'" lock-x scroller-y v-ref:listb>
                    <div>
                        <no-data v-if="List1.length === 0"></no-data>
                        <div v-else v-for="order in List1">
                            <j-order-block :img="order.appt.customerImage" :time="getTime(order.appt.createdAt)" :name="order.appt.customerName" :tel="order.appt.customerMobile" :status="Status.zc[order.status].name"></j-order-block>
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <!-- 在待支付时暂未分单，使用的是appointment -->
                            <div class="store">
                                <div class="store-line-1">
                                    <div class="store-name">{{order.storeName}}</div>
                                    <div class="store-tel"><img :src="telImg"></div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">{{order.brandName}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">正价金额</div>
                                    <div class="store-line-2-right">{{order.normalAmount|currency '￥' 2}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-left">特价金额</div>
                                    <div class="store-line-2-right">{{order.specialAmount|currency '￥' 2}}</div>
                                </div>
                                <div class="store-line-2">
                                    <div class="store-line-2-right">总计:{{order.normalAmount+order.specialAmount|currency '￥' 2}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </swiper-item>
    </swiper>
</div>
<j-footer></j-footer>
</template>
<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import NoData from 'common/components/no-data'
import Status from 'common/status'
import {
    Tab,
    TabItem
} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Scroller from 'vux-components/scroller'
import telImg from 'common/assets/images/tel.png'
import JFooter from 'components/JFooter'
import JOrderBlock from 'common/components/j-order-block'
import guideImg from 'common/assets/images/role/guide.png'
try {
    let now = Number(new Date().getTime())
    if (Number(JSON.parse(localStorage['service-manager']).expiredAt) < now) {
        localStorage.removeItem('service-manager')
        location.href = './verifyPhone.html'
    }
    axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("service-manager")).tokenType + ' ' + JSON.parse(localStorage.getItem("service-manager")).token
} catch (e) {
    localStorage.clear()
    location.href = './verifyPhone.html'
}
export default {
    data() {
        return {
            index: 0,
            Status,
            List0: [],
            List1: [],
            List2: [],
            List3: [],
            telImg,
            guideImg
        }
    },
    components: {
        JOrderBlock,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Scroller,
        NoData,
        JFooter,
    },
    ready() {
        axios.get(`${Lib.C.mOrderApi}materialOrders/byStoreUser`, {
            params: {
                filter: `status:0,6`,
                sort: "createdAt,desc",
                userId: JSON.parse(localStorage.getItem('service-manager')).userId,
                size: 1000
            }
        }).then((res) => {
            res.data.data.map((order) => {
                switch (order.status) {
                    case 6:
                        this.List0.push(order)
                        break;
                    case 0:
                        this.List1.push(order)
                        break;
                    default:
                        break;
                }
            })
            this.$nextTick(() => {
                this.$refs.lista.reset()
                this.$refs.listb.reset()
            })
        }).catch((err) => {
            alert("获取订单失败，请稍候再试QAQ")
            throw err
        })
    },
    methods: {
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        getScreenHeight() {
            return document.body.clientHeight
        },
        confirm(orderNo) {
            axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/confirmOrder`,{params:{}}).then((res) => {
                alert('确认订单成功!')
                location.reload()
            }).catch((err) => {
                alert('网络连接失败，请重试')
                throw err
            })
        }
    }
}
</script>

<style>
html {
    height: 100%;
}

body {
    background-color: #eee;
    height: 100%;
}
</style>
<style scoped lang="less">
.content {
    padding-bottom: 45px;
}

.store {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    .store-line-1 {
        position: relative;
        height: 50px;
        width: calc(~"100% - 15px");
        border-bottom: 1px solid #eee;
        margin-left: 15px;
        .store-name {
            position: absolute;
            top: 0;
            left: 0;
            height: 50px;
            line-height: 50px;
            color: #393939;
        }
        .store-tel {
            position: absolute;
            top: 0;
            right: 15px;
            height: 50px;
            line-height: 50px;
            img {
                height: 20px;
                width: 20px;
                vertical-align: middle;
            }
        }
    }
    .store-line-2 {
        position: relative;
        height: 30px;
        width: calc(~"100% - 15px");
        margin-left: 15px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        .store-line-2-left {
            position: absolute;
            left: 0;
            top: 0;
            height: 30px;
            line-height: 30px;
            color: #393939;
        }
        .store-line-2-right {
            position: absolute;
            right: 15px;
            top: 0;
            height: 30px;
            line-height: 30px;
            color: #ec5835;
        }
    }
}

.operate {
    height: 30px;
    width: calc(~"100% - 30px");
    padding: 7px 15px;
    text-align: right;
    .bottom {
        display: inline-block;
        height: 30px;
        width: 70px;
        line-height: 30px;
        text-align: center;
        color: #999;
        border: 1px solid #999;
        border-radius: 5px;
        font-size: 12px;
        margin-left: 20px;
    }
}
</style>
