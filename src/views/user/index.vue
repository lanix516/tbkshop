<template>
  <div class="user">
    <round-btn @click.native="showLeaveMessage=true" style="right:10px" icon="ellipsis"></round-btn>
    <img class="user-poster" :src="require('../../assets/images/banner.jpg')">
    <van-row class="user-links">
      <van-col span="12">
        <van-icon name="refund-o" size="36px"/>
        <p class="back-money">当前返利总额：{{info.taobi+info.reckonTaobi}}</p>
      </van-col>
      <van-col span="12">
        <van-icon name="cart-circle-o" size="36px"/>
        <p class="back-money">共节省：{{info.tixiantaobi}}</p>
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="balance-o" :value="info.taobi">
        <template slot="title">
          <span class="custom-text">可提现</span>
          <van-icon name="question-o" color="#1989fa" @click="$toast('当前可以提现的账户总额')"/>
        </template>
      </van-cell>
      <van-cell icon="clock-o" title="待结算" :value="info.reckonTaobi">
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
      <van-cell icon="cash-back-record" title="提取返利" is-link url="/cash"/>
      <van-cell icon="records" title="提取记录" is-link/>
      <van-cell
        class="push-btn"
        icon="hot-o"
        title="我要推广"
        @click="pushInfo"
        :data-clipboard-text="shareUrl"
        is-link
      />
      <van-cell icon="todo-list-o" title="推广记录" is-link/>
    </van-cell-group>

    <van-cell-group title="账户">
      <van-cell icon="shopping-cart-o" title="全部订单" is-link/>
      <van-cell icon="alipay" title="返利账号" is-link url="/alipay"/>
    </van-cell-group>
    <van-popup v-model="showLeaveMessage">
      <van-cell-group>
        <van-field
          maxlength="200"
          type="textarea"
          v-model="leaveMessage"
          placeholder="请输入留言"
          rows="4"
          autosize
        />
      </van-cell-group>
      <van-cell-group style="text-align:center;padding:5px 0;">
        <van-button @click="leave" type="primary">留言</van-button>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Popup, Field, Button } from "vant";
import Clipboard from "clipboard";
import RoundBtn from "@/components/RoundBtn";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    RoundBtn
  },
  data() {
    return {
      showLeaveMessage: false,
      leaveMessage: "",
      info: {}
    };
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$router.push("/login");
    }
    this.getUserInfo();
  },
  computed: {
    shareUrl() {
      return `最强淘宝返利云平台，安全高效，买到还能赚到！网址  
      https://www.chengdongkeji.com/register/${this.$store.state.userInfo.uid}`;
    }
  },
  methods: {
    getUserInfo() {
      let url = `/info`;
      this.axios.get(url).then(res => {
        let data = res.data;
        this.info = data.data;
      });
    },
    pushInfo() {
      // https://www.chengdongkeji.com/#/register/id

      var clipboard = new Clipboard(".push-btn");
      clipboard.on("success", e => {
        this.$toast("推广链接已经复制到粘贴板, 快去发送给好友吧");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    leave() {
      this.showLeaveMessage = false;
      if (this.leaveMessage) {
        let url = `/jianyi`;
        let form = new FormData();
        form.append("content", this.leaveMessage);
        this.axios.post(url, form).then(res => {
          this.$toast("留言成功，感谢您的宝贵意见！");
        });
      } else {
        this.$$toast("请输入留言");
        return false;
      }
    }
  }
};
</script>

<style lang="less">
.user {
  padding-bottom: 55px;
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
.van-popup {
  width: 80%;
  box-sizing: border-box;
  .pop-content {
    background-color: aliceblue;
    color: #666;
    font-size: 14px;
    line-height: 18px;
    word-break: break-all;
    word-wrap: break-word;
    margin: 15px 10px;
    min-height: 150px;
  }
}
</style>
