<template>
  <div>
    <img class="user-poster" :src="require('../../assets/images/banner.jpg')">
    <van-row class="user-links">
      <van-col span="12">
        <van-icon name="refund-o" size="36px"/>
        <p class="back-money">待提返利：18.00</p>
      </van-col>
      <van-col span="12">
        <van-icon name="cart-circle-o" size="36px"/>
        <p class="back-money">共节省：200.00</p>
      </van-col>
      <!-- 
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>-->
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="balance-o" value="100.00">
        <template slot="title">
          <span class="custom-text">可提现</span>
          <van-icon name="question-o" color="#1989fa" @click="$toast('当前可以提现的账户总额')"/>
        </template>
      </van-cell>
      <van-cell icon="clock-o" title="待结算" value="80.00">
        <template slot="title">
          <span class="custom-text">待结算</span>
          <van-icon
            name="question-o"
            color="#1989fa"
            @click="$toast('正在与淘宝进行返利结算, 一般需要15-30天，结算后即可提现')"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="返利操作" class="user-group">
      <van-cell icon="cash-back-record" title="提取返利" is-link/>
      <van-cell icon="records" title="提取记录" is-link/>
      <van-cell icon="todo-list-o" title="推广记录" is-link/>
    </van-cell-group>

    <van-cell-group title="账户">
      <van-cell icon="shopping-cart-o" title="全部订单" is-link/>
      <van-cell icon="alipay" title="返利账号" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
    .back-money {
      font-size: 15px;
      color: #666;
      color: #ff0000;
      font-weight: 600;
    }
  }
}
</style>
