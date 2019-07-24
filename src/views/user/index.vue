<template>
  <div class="user">
    <round-btn @click.native="showLeaveMessage=true" style="right:10px" icon="ellipsis"></round-btn>
    <img class="user-poster" :src="require('../../assets/images/banner.jpg')" />
    <van-row class="user-links">
      <van-col span="12">
        <van-icon name="refund-o" size="36px" />
        <p class="back-money">当前返利总额：{{(info.taobi+info.reckonTaobi).toFixed(2)}}</p>
      </van-col>
      <van-col span="12">
        <van-icon name="cart-circle-o" size="36px" />
        <p class="back-money">共节省：{{info.tixiantaobi}}</p>
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="balance-o" :value="info.taobi">
        <template slot="title">
          <span class="custom-text">可提现</span>
          <van-icon name="question-o" color="#1989fa" @click="$toast('当前可以提现的账户总额')" />
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
      <van-cell icon="cash-back-record" title="提取返利" is-link url="/cash" />
      <van-cell icon="records" title="提取记录" is-link url="/cashlog" />
      <van-cell icon="records" title="我要赚钱" is-link url="/profit" />
      <van-cell icon="hot-o" title="我要推广" @click="showPop=true" is-link />
      <van-popup v-model="showPop">
        <van-panel title="推广链接">
          <div class="pop-content">
            <p v-html="shortUrl"></p>
          </div>
          <div slot="footer">
            <van-button
              size="large"
              type="primary"
              class="push-btn"
              :data-clipboard-text="shortUrl"
              @click="pushInfo"
            >一键复制</van-button>
          </div>
        </van-panel>
      </van-popup>
      <van-cell icon="todo-list-o" title="推广记录" is-link url="/tuilog" />
    </van-cell-group>

    <van-cell-group title="账户">
      <van-cell icon="shopping-cart-o" title="全部订单" is-link url="/orderlist" />
      <van-cell icon="alipay" title="返利账号" is-link url="/alipay" />
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
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Popup,
  Field,
  Button,
  Panel
} from "vant";
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
    [Panel.name]: Panel,
    RoundBtn
  },
  data() {
    return {
      showPop: false,
      showLeaveMessage: false,
      leaveMessage: "",
      info: {},
      shortUrl: `最强淘宝返利云平台，安全高效，买到还能赚到！网址  
      https://${location.host}/register/${this.$store.state.userInfo.uid}`
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
      https://${location.host}/register/${this.$store.state.userInfo.uid}`;
    }
  },
  methods: {
    getUserInfo() {
      let url = `/info`;
      this.axios.get(url).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.info = data.data;
          this.shortUrl = `最强淘宝返利云平台，安全高效，买到还能赚到！网址${this.info.tuilink}`;
        } else {
          localStorage.removeItem("userInfo");
          this.$store.commit("setLogin", false);
          this.$store.commit("setUserInfo", "");
          this.$router.push("/login");
        }
      });
    },
    pushInfo() {
      // https://www.ddyfl.com/#/register/id

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
      this.showPop = false;
    },
    // getShortUrl() {
    //   let url = `https://api.weibo.com/short_url/shorten.json?source=2849184197&url_long=https://www.ddyfl.com/register/${
    //     this.$store.state.userInfo.uid
    //   }`;
    //   this.axios.get(url).then(res => {
    //     let result = res.data;
    //     let urlobj = result.urls[0];
    //     if (urlobj.result) {
    //       this.shortUrl = `最强淘宝返利云平台，安全高效，买到还能赚到！网址 ${
    //         urlobj.url_short
    //       }`;
    //     }
    //   });
    // },
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
    min-height: 100px;
  }
}
</style>
