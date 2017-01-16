<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 0" v-tap="index = 0">退款申请</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 1" v-tap="index = 1">已确认</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 2" v-tap="index = 2">退款中</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 3" v-tap="index = 3">退款成功</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 4" v-tap="index = 4">退款失败</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-ref:lista>
          <div>
          <no-data v-if="list0.length==0"></no-data>
          <div v-else>
            <j-tk-order-list-item v-for="order in list0" :data="order"></j-tk-order-list-item>
          </div>
        </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-ref:listb>
          <div>
            <no-data v-if="list1.length==0"></no-data>
            <div v-else>
              <j-tk-order-list-item v-for="order in list1" :data="order"></j-tk-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-ref:listc>
          <div>
            <no-data v-if="list2.length==0"></no-data>
            <div v-else>
              <j-tk-order-list-item v-for="order in list2" :data="order"></j-tk-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-ref:listd>
          <div>
            <no-data v-if="list3.length==0"></no-data>
            <div v-else>
              <j-tk-order-list-item v-for="order in list3" :data="order"></j-tk-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-ref:liste>
          <div>
            <no-data v-if="list4.length==0"></no-data>
            <div v-else>
              <j-tk-order-list-item v-for="order in list4" :data="order"></j-tk-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
  </swiper>

</div>

<j-footer></j-footer>

<!-- <confirm :show.sync="showConfirm.cancel" title="" confirm-text="是" cancel-text="否" @on-confirm="cancel(tempOrderNo)">
  <p style="text-align:center;">您确认要撤销退款吗?</p>
</confirm>

<confirm :show.sync="showConfirm.delete" title="" confirm-text="是" cancel-text="否" @on-confirm="deleteOrder(tempOrderNo)">
  <p style="text-align:center;">您确认要删除该订单吗?</p>
</confirm> -->
<confirm :show="reasonShow" cancel-text="取消" confirm-text="确定" @on-cancel="reasonShow = false" @on-confirm="reasonShow = false" title="退款失败原因">
  <p style="text-align: center;">{{refusalReason}}</p>
</confirm>
</template>

<script>
import Lib from 'assets/Lib.js'
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Confirm from 'vux-components/confirm'
import JTkOrderListItem from 'components/j-tk-order-list-item'
import Scroller from 'vux-components/scroller'
import NoData from 'common/components/no-data'
import axios from 'axios'
import JFooter from 'components/JFooter'

try {
    let now = Number(new Date().getTime())
    if (Number(JSON.parse(localStorage['user']).expiredAt) < now) {
        localStorage.removeItem('user')
        location.href = './verifyPhone.html'
    }
    axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
    localStorage.clear()
    location.href = './verifyPhone.html'
}
export default {
  data() {
    return {
      index: Lib.M.GetRequest().type || 0,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      showConfirm: {
        cancel: false,
        delete: false
      },
      tempOrderNo: null,
      reasonShow: false,
      refusalReason: ''
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    Confirm,
    NoData,
    JTkOrderListItem,
    JFooter
  },
  ready() {
    axios.get(`${Lib.C.mOrderApi}materialRefundOrders/byStoreUser?userId=${JSON.parse(window.localStorage.getItem('user')).userId}`).then((res) => {
      res.data.data.map((order) => {
        switch (order.status) {
          case 1:
            this.list0.push(order)
            break;
          case 2:
            this.list1.push(order)
            break;
          case 3:
            this.list2.push(order)
            break;
          case 4:
            this.list3.push(order)
            break;
          case 5:
            this.list4.push(order)
            break;
          default:
            break;
        }
      })
      this.$nextTick(() => {
        this.$refs.lista.reset()
        this.$refs.listb.reset()
        this.$refs.listc.reset()
        this.$refs.listd.reset()
        this.$refs.liste.reset()
      })
    }).catch((err) => {
      throw err
    })
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
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
    padding-top: 44px;
}
header {
    position: fixed;
    height: 44px;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 30;
}
.tab-active {
    color: #88C929 !important;
    border-color: #88C929 !important;
    font-size: 12px!important;
}
</style>
