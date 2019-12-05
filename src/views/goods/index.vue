<template>
  <div class="goods">
    <div class="back-btn" @click="$router.back()">
      <van-icon size="24px" color="#FFFFFF" name="arrow-left" style="top:6px; left:6px" />
    </div>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item>
        <img :src="goods.pictUrl" style="height:375px" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <div class="goods-title">
          <span v-html="goods.title"></span>
        </div>
        <div class="goods-price">原价：{{ goods.zkPrice }}</div>
        <div class="coupon-price">
          券后价格：{{goods.quanhoujia}}元
          <van-tag type="danger" v-if="hasCoupon">{{goods.couponInfo}}</van-tag>
        </div>
        <div class="coupon-price">共为您节省(券+返利) {{formatPrice(goods.couponAmount+goods.tkCommFee)}}元</div>
      </van-cell>
      <van-cell :value="goods.shopTitle" icon="shop-o" is-link :url="goods.shortLinkUrl"></van-cell>
      <van-coupon-cell
        v-show="hasHongBao"
        title="本站红包"
        :coupons="this.goods.hongbao"
        :chosen-coupon="chosenCoupon"
        @click="showHongBao"
      />
      <van-popup v-model="showHB" position="bottom" style="width:100%">
        <van-coupon-list
          :show-exchange-bar="false"
          :coupons="this.goods.hongbao"
          :chosen-coupon="chosenCoupon"
          @change="onChange"
          @exchange="onExChange"
        />
      </van-popup>
      <van-cell v-if="hasCoupon">
        <van-col span="12">
          <span style="color:#000">淘宝红包</span>
        </van-col>
        <van-col span="12" style="text-align:right">
          <span style="color:#999">剩余券：{{goods.couponLeftCount}} 张</span>
        </van-col>
      </van-cell>
      <div style="padding:10px" v-if="hasCoupon">
        <coupon
          :couponInfo="goods.couponInfo"
          :offset="goods.couponAmount"
          :quanUrl="goods.couponShortLinkUrl"
        ></coupon>
      </div>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="为您节省" :value="goods.couponAmount" v-if="hasCoupon" />
      <van-cell title="返利" :value="formatPrice(goods.tkCommFee)" />
    </van-cell-group>
    <van-goods-action style="z-index:2">
      <van-goods-action-icon class="copy-btn" @click="openPopup(1)" icon="friends" text="分享" />
      <van-goods-action-icon icon="chat-o" @click="showWeChat=true" text="客服" />
      <van-goods-action-button type="warning" @click="openPopup">前往淘宝购买</van-goods-action-button>
      <van-popup v-model="showPop">
        <van-panel title="复制内容">
          <div class="pop-content">
            <p v-html="short?goods.shortshare:goods.share"></p>
          </div>
          <div slot="footer" style="text-align:center">
            <van-button
              class="coyp-tb"
              type="warning"
              :data-clipboard-text="short?goods.shortshare:goods.share"
              @click="copyToTb"
            >一键复制</van-button>
          </div>
        </van-panel>
      </van-popup>
      <van-popup v-model="showWeChat">
        <van-panel title="微信客服助手">
          <div>
            <p style="font-size:22px;text-align:center">微信：chengdongkeji</p>
          </div>
          <div slot="footer" style="text-align:center">
            <van-button
              type="warning"
              class="coyp-wx"
              data-clipboard-text="chengdongkeji"
              @click="copyToWx"
            >一键复制微信号</van-button>
          </div>
        </van-panel>
      </van-popup>
    </van-goods-action>
  </div>
</template>

<script>
import Coupon from "../../components/good/Coupon2";
import Clipboard from "clipboard";

import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Popup,
  Panel,
  Button,
  ActionSheet,
  CouponCell,
  CouponList
} from "vant";

export default {
  components: {
    Coupon,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Popup.name]: Popup,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList
  },
  props: ["keyword"],
  data() {
    return {
      showClipboard: false,
      goods: {},
      loader: "",
      showPop: false,
      short: true,
      showWeChat: false,
      showHB: false,
      chosenCoupon: -1,
      coupons: [
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "1.5",
          unitDesc: "元",
          choose: -1
        }
      ]
    };
  },
  created() {
    this.loader = this.$loading.show();
  },
  mounted() {
    this.addBaiduPush();
    if (this.keyword) {
      this.getGoodDetail();
    }
  },
  computed: {
    hasCoupon() {
      return (
        this.goods.hasOwnProperty("couponInfo") &&
        this.goods.hasOwnProperty("couponLeftCount") &&
        this.goods.hasOwnProperty("couponShortLinkUrl") &&
        this.goods.hasOwnProperty("couponAmount")
      );
    },
    hasHongBao() {
      return this.goods.hongbao && this.goods.hongbao.length > 0;
    },
    afterPrice() {
      return this.hasCoupon
        ? this.goods.zkPrice - this.goods.couponAmount
        : this.goods.zkPrice;
    }
  },
  methods: {
    addBaiduPush() {
      var bp = document.createElement("script");
      var curProtocol = window.location.protocol.split(":")[0];
      if (curProtocol === "https") {
        bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
      } else {
        bp.src = "http://push.zhanzhang.baidu.com/push.js";
      }
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
    },
    copyInfo(idx) {
      var clipboard = new Clipboard(".copy-btn");
      clipboard.on("success", e => {
        this.$toast(`复制成功,请前往粘贴`);
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
    copyToTb() {
      var clipboard = new Clipboard(".coyp-tb");
      clipboard.on("success", e => {
        this.$toast(`复制成功`);
        // 释放内存
        clipboard.destroy();
        this.showPop = false;
        this.openTaobao();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
        this.showPop = false;
      });
    },
    copyToWx() {
      var clipboard = new Clipboard(".coyp-wx");
      clipboard.on("success", e => {
        this.$toast(`复制成功`);
        // 释放内存
        clipboard.destroy();
        this.showWeChat = false;
        window.location.href = "weixin://";
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
        this.showWeChat = false;
      });
    },
    getGoodDetail() {
      let url = "/";
      let form = new FormData();
      form.append("keyword", this.keyword);
      this.axios.post(url, form).then(res => {
        let data = res.data;
        this.loader.hide();

        if (data.code == 200) {
          this.goods = data.data;
          this.goods.hongbao.map(hb => {
            hb.startAt = new Date(hb.startat).getTime() / 1000;
            hb.endAt = new Date(hb.endat).getTime() / 1000;
            hb.valueDesc = hb.value;
            hb.value = hb.value * 100;
            hb.unitDesc = "元";
            hb.condition = `${hb.valueDesc}元红包区\n产品可以`;
            console.log(_cons);
          });
        } else if (data.code == 301) {
          location.href = data.data;
        } else {
          this.$toast(data.msg);
          this.$router.back();
        }
      });
    },
    formatPrice(price) {
      return price ? price.toFixed(2) : 0;
    },
    openPopup(idx) {
      if (idx == 1) {
        this.short = false;
      } else {
        this.short = true;
      }
      this.showPop = true;
    },
    openTaobao() {
      window.location.href = "taobao://";
    },
    onClickCart() {
      this.$router.push("cart");
    },
    //展示站内红包
    showHongBao(e) {
      this.showHB = true;
    },
    getHongBao(e) {
      console.log(e);
    },
    onChange(e) {
      this.chosenCoupon = e;
      this.showHB = false;
    },
    onExChange(e) {
      this.$toast("暂无可用优惠码");
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;
  .back-btn {
    background-color: rgba(0, 0, 0, 0.4);
    height: 36px;
    width: 36px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    z-index: 10;
  }
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 14px;
  }

  &-price {
    font-size: 14px;
    color: #969799;
  }
  .coupon-price {
    font-size: 18px;
    font-weight: 800;
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
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
  }
}
</style>
