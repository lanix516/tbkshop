<template>
  <div class="home">
    <van-nav-bar title="多多云返利" :left-arrow="false">
      <a href="https://www.ddyfl.com/tkinfo/" target="_blank" slot="left">
        <van-icon name="question-o" />
      </a>
      <van-icon @click="showActive=true" v-if="$store.state.isLogin" name="contact" slot="right" />
      <span @click="gotoLogin" v-if="!$store.state.isLogin" slot="right">登陆</span>
    </van-nav-bar>
    <van-action-sheet
      style="width:100%"
      v-model="showActive"
      :actions="actions"
      @select="onSelectAction"
    />

    <van-search v-model="searchValue" placeholder="前往搜索" show-action @click="doSearch">
      <div slot="action" @click="doSearch">
        <span style="font-size:15px;font-weight:1000;color:#ff0000">搜索</span>
      </div>
    </van-search>
    <div class="home-swipe">
      <!-- <div class="home-swipe-head">
        <span class="recommend">今日推荐</span>
        <span class="tips">每天都有新发现</span>
        <span class="swipe-num">
          <span class="indexPage">{{indexPage+1}}</span>
          <span class="pageNum">/4</span>
        </span>
      </div>-->
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item
          class="swipe-item copy-swiper"
          v-for="swiper in swiperList"
          @click="gotoPage(swiper)"
          :key="swiper.name"
          :data-clipboard-text="swiper.taotoken"
        >
          <img :src="swiper.picturl" style="width:100%;max-height:149px;margin:0 auto;" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-tabs v-model="activeClass" sticky @change="onTabChange">
      <van-tab v-for="item in classList" :title="item" :key="item">
        <div class="goods-list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row gutter="5">
              <van-col v-for="(item, idx) in list" :key="idx" span="12">
                <div class="good-item" @click="gotoDetail(item)">
                  <div class="good-box">
                    <img :src="item.pictUrl" />
                    <div class="name">{{item.title}}</div>
                    <div class="info">
                      <div class="slogan">{{item.couponAmount}}元券</div>
                      <div class="back">返￥{{item.tkCommFee}}</div>
                    </div>
                    <div class="info">
                      <div class="oldprice">￥{{item.zkPrice}}</div>
                      <div class="price">券后价￥{{item.quanhoujia}}</div>
                    </div>
                    <div class="info">
                      <div class="sell">30天销量 {{item.biz30day}}</div>
                    </div>
                  </div>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="showMission" class="pop-box">
      <a :href="activeUrl">
        <img src="../../assets/images/hongbao.gif" />
      </a>
    </van-popup>
    <float-btn v-show="showHbArea" :activeUrl="activeUrl"></float-btn>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import {
  Search,
  Swipe,
  SwipeItem,
  Row,
  Col,
  NavBar,
  Icon,
  Tab,
  Tabs,
  ActionSheet,
  Popup
} from "vant";
import FloatBtn from "@/components/FloatBtn";
export default {
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    FloatBtn
  },
  name: "Home",
  data() {
    return {
      showMission: false, // 领红包弹出框
      showHbArea: false, //右下角红包区按钮
      activeUrl: "",
      showSearch: false,
      searchValue: "",
      count: 0,
      indexPage: 1,
      hotGoods: [],
      saleGroupGoods: [],
      classList: [],
      activeClass: 0,
      activeClassName: "",
      list: [],
      error: false,
      loading: false,
      finished: false,
      showActive: false,
      swiperList: [],
      actions: [
        {
          name: "用户: ",
          subname: this.$store.state.userInfo.phone
        },
        {
          name: "退出登陆"
        }
      ]
    };
  },
  mounted() {
    this.getSwiperList();
    this.getGoodsClass();
    this.showHongBao();
  },

  computed: {},
  methods: {
    //判断是否显示领取红包弹框
    showHongBao() {
      let url = `/pophb`;
      this.axios.get(url).then(res => {
        let hashb = res.data.data.hasHb;
        this.activeUrl = res.data.data.url;
        if (hashb) {
          this.showHbArea = false;
          this.showMission = true;
        } else {
          this.showHbArea = true;
          this.showMission = false;
        }
      });
    },
    getSwiperList() {
      let url = `/poster`;
      this.axios.get(url).then(res => {
        let data = res.data;
        this.swiperList = data.data;
      });
    },
    gotoPage(swiper) {
      if (swiper.taotoken) {
        var clipboard = new Clipboard(".copy-swiper");
        clipboard.on("success", e => {
          console.log(e);
          this.$toast(`复制成功`);
          // 释放内存
          clipboard.destroy();
          window.location.href = "taobao://";
        });
        clipboard.on("error", e => {
          // 不支持复制
          console.log("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
          window.location.href = swiper.picthref;
        });
      } else {
        window.location.href = swiper.picthref;
      }
    },

    gotoLogin() {
      this.$router.push("/login");
    },
    onSelectAction(item) {
      this.showActive = false;
      if (item.name == "退出登陆") {
        localStorage.removeItem("userInfo");
        this.$store.commit("setLogin", false);
        this.$store.commit("setUserInfo", "");
      }
    },
    getGoodsClass() {
      let url = `/g/yiji`;
      this.axios.get(url).then(res => {
        let data = res.data;
        this.classList = data.data;
        if (this.classList.length > 0) {
          this.activeClassName = this.classList[0];
          this.getClassGoods();
        }
      });
    },
    doSearch() {
      this.$router.push("/search");
    },
    onTabChange(item, title) {
      this.activeClassName = title;
      this.list = [];
      this.indexPage = 1;
      this.getClassGoods();
    },
    onLoad() {
      this.indexPage += 1;
      this.getClassGoods();
    },
    getClassGoods() {
      let url = "";
      if (this.activeClassName) {
        url = `/g/goods/${this.activeClassName}/${this.indexPage}`;
      } else {
        url = `/g/goods`;
      }

      this.axios.get(url).then(res => {
        this.list = [...this.list, ...res.data.data];
        this.count = res.data.count;
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }
      });
    },
    gotoDetail(item) {
      this.$router.push(`/goods?keyword=${item.details}`);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #eee;
  margin-bottom: 50px;
  overflow: hidden;
}
.home-swipe {
  box-sizing: border-box;
  padding: 4px 6px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  margin-bottom: 5px;
  &-head {
    padding: 4px 0;
    .recommend {
      font-weight: 700;
    }
    .tips {
      font-size: 12px;
      margin-left: 6px;
      color: #8f8f8f;
    }
    .swipe-num {
      float: right;
      .indexPage {
        font-weight: 700;
      }
      .pageNum {
        font-size: 12px;
        color: #8f8f8f;
      }
    }
  }
  .swipe {
    img {
      width: 100%;
    }
  }
}
.search-part {
  padding: 10px;
  color: rgba(69, 90, 100, 0.6);
}
.goods-list {
  margin-top: 5px;
  background-color: #ffffff;
  .good-item {
    width: 100%;
    border-radius: 20px;
    margin-top: 10px;
    img {
      width: 100%;
      border-radius: 20px 20px 0 0;
    }
    .name {
      width: 92%;
      padding: 5px 4%;
      text-align: justify;
      overflow: hidden;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 92%;
      padding: 5px 4% 5px 4%;
      .oldprice {
        color: #888;
        font-size: 15px;
        text-decoration: line-through;
      }
      .price {
        color: #888;
        font-size: 15px;
      }
      .slogan {
        color: #fff;
        background-color: #ff6600;
        padding: 2px;
        font-size: 14px;
        font-weight: 600;
      }
      .back {
        border: 1px dashed #ff3300;
        padding: 2px;
        font-size: 14px;
        font-weight: 600;
        color: #ff6600;
      }
      .sell {
        color: #888;
        font-size: 13px;
      }
    }
  }
}
.pop-box {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
}
</style>