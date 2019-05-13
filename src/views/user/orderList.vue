<template>
  <div class="order-list">
    <van-nav-bar title="全部订单" left-text="返回" left-arrow @click-left="$router.push('/user')"/>
    <div style="margin-top:10px">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrder">
        <van-card
          v-for="item in orderList"
          :key="item.dingdanid"
          :title="item.Content"
          :desc="getDate(item.createTime)"
          :price="formatPrice(item.price)"
          :thumb="require('../../assets/images/shirt.png')"
          centered
        >
          <p slot="title">{{item.Content}}</p>
          <div slot="tag">
            <van-tag mark v-if="item.statusCode==3" type="danger">{{item.status}}</van-tag>
            <van-tag mark v-if="item.statusCode==2" type="success">{{item.status}}</van-tag>
            <van-tag mark v-if="item.statusCode==1" type="primary">{{item.status}}</van-tag>
          </div>
          <div slot="footer">
            <span style="margin-right:10px">
              预估收入:
              <i style="color:#ff0000">￥{{formatPrice(item.reckonIncome)}}</i>
            </span>
            <span>
              结算收入:
              <i style="color:#ff0000">￥{{formatPrice(item.realIncome)}}</i>
            </span>
          </div>
        </van-card>
      </van-list>
      <no-data v-if="orderList.length == 0&&!loading"></no-data>
    </div>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup, NavBar, Button, Card, Tag } from "vant";
import NoData from "@/components/NoData";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Card.name]: Card,
    [Tag.name]: Tag,
    NoData
  },
  data() {
    return {
      loading: false,
      finished: false,
      orderList: [],
      page: {
        currpage: 0,
        pagecount: 1
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getOrder() {
      let _current = this.page.currpage + 1;
      let _url = "/getorder/" + _current;
      if (_current > this.page.pagecount) {
        this.finished = true;
        return false;
      }
      this.axios.get(_url).then(res => {
        this.loading = false;
        let result = res.data;
        let { pagecount, currpage, data } = result.data;
        this.page = { pagecount, currpage };
        if (data.length > 0) {
          this.orderList = [...this.orderList, ...data];
        }
        if (data.length < 20) {
          this.finished = true;
        }
      });
    },
    getDate(date_str) {
      return date_str.split(".")[0];
    },
    formatPrice(money) {
      if (money) {
        let _money = Math.ceil(Number(money) * 100) / 100;
        return _money;
      } else {
        return 0;
      }
    }
  },
  filters: {
    // formatPrice(money) {
    //   return money.toFix(2)
    // }
  }
};
</script>

<style lang="less">
.order-list {
  z-index: 1000;
  padding-bottom: 55px;
  background-color: f8f8f8;
  p {
    margin: 0;
  }
}
</style>
