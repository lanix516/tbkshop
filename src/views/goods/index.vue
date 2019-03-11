<template>
  <div class="goods">
    <div class="back-btn" @click="$router.back()">
      <van-icon size="24px" color="#FFFFFF" name="arrow-left" style="top:6px; left:6px"/>
    </div>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item>
        <img :src="goods.pictUrl" style="height:375px">
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">原价：{{ goods.zkPrice }}</div>
        <div class="coupon-price">
          券后价格：{{afterPrice}}元
          <van-tag type="danger" v-if="hasCoupon">{{goods.couponInfo}}</van-tag>
        </div>
        <div class="coupon-price">共为您节省(券+返利) {{formatPrice(goods.couponAmount+goods.tkCommFee)}}元</div>
      </van-cell>
      <van-cell :value="goods.shopTitle" icon="shop-o" is-link :url="goods.shortLinkUrl"></van-cell>
      <van-cell class="goods-express" v-if="hasCoupon">
        <van-col span="12">
          <span style="color:#999">{{goods.couponInfo}}</span>
        </van-col>
        <van-col span="12">
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
      <van-cell title="为您节省" :value="goods.couponAmount" v-if="hasCoupon"/>
      <van-cell title="返利" :value="formatPrice(goods.tkCommFee)"/>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o">客服</van-goods-action-mini-btn>
      <van-goods-action-mini-btn
        :data-clipboard-text="goods.share"
        class="copy-btn"
        @click="copyInfo(2)"
        icon="friends"
        text="QQ分享"
      />
      <van-goods-action-mini-btn
        :data-clipboard-text="goods.share"
        class="copy-btn"
        @click="copyInfo(1)"
        icon="chat"
        text="微信分享"
      />
      <!-- <van-goods-action-big-btn default>转发到微信</van-goods-action-big-btn>
      <van-goods-action-big-btn primary>转发到QQ</van-goods-action-big-btn>-->
      <van-goods-action-big-btn :url="goods.couponShortLinkUrl">打开淘宝购买</van-goods-action-big-btn>
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
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Popup
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
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Popup.name]: Popup
  },
  props: ["keyword"],
  data() {
    return {
      showClipboard: false,
      goods: {},
      loader: ""
    };
  },
  created() {
    this.loader = this.$loading.show();
  },
  mounted() {
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
    afterPrice() {
      return this.hasCoupon
        ? this.goods.zkPrice - this.goods.couponAmount
        : this.goods.zkPrice;
    }
  },
  methods: {
    copyInfo(idx) {
      let target = idx == 1 ? "微信" : "QQ";
      var clipboard = new Clipboard(".copy-btn");
      clipboard.on("success", e => {
        this.$toast(`复制成功,请打开${target}粘贴`);
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
    getGoodDetail() {
      let url = "/";
      let form = new FormData();
      form.append("keyword", this.keyword);
      this.axios.post(url, form).then(res => {
        let data = res.data;
        this.loader.hide();

        if (data.code == 200) {
          this.goods = data.data;
        } else {
          this.$toast(data.msg);
          this.$router.back();
        }
      });
    },
    formatPrice(price) {
      return price ? price.toFixed(2) : 0;
    },

    onClickCart() {
      this.$router.push("cart");
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
</style>
