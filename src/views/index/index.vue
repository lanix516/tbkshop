<template>
  <div class="home">
    <van-search v-model="searchValue" placeholder="请粘贴淘口令或商品链接到此处" show-action @search="doSearch">
      <div slot="action" @click="doSearch">
        <span style="font-size:15px;font-weight:1000;color:#ff0000">搜索</span>
      </div>
    </van-search>

    <div class="home-swipe">
      <div class="home-swipe-head">
        <span class="recommend">今日推荐</span>
        <span class="tips">每天都有新发现</span>
        <span class="swipe-num">
          <span class="indexPage">{{indexPage+1}}</span>
          <span class="pageNum">/4</span>
        </span>
      </div>
      <van-swipe :autoplay="3000" class="swipe" @change>
        <van-swipe-item class="swipe-item">
          <img src="../../assets/images/swipe-1.jpg">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- <div class="recommend">
      <div class="recommend-title">
        <div class="border"></div>
        <div class="title">朋友圈的好货推荐</div>
        <div class="border"></div>
      </div>
    </div>-->
    <div class="goods-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row>
          <van-col v-for="(item, idx) in list" :key="idx" span="12">
            <div class="good-item">
              <div class="van-hairline--surround">
                <div class="good-box">
                  <div>pic</div>
                  <div>12312312312312313123</div>
                  <div>￥84</div>
                  <div>推荐：111</div>
                </div>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Row, Col } from "vant";
export default {
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,

    [Row.name]: Row,
    [Col.name]: Col
  },
  name: "Home",
  data() {
    return {
      showSearch: false,
      searchValue: "",
      indexPage: 1,
      hotGoods: [],
      saleGroupGoods: [],
      list: [1, 2, 3],
      error: false,
      loading: false,
      finished: false
    };
  },
  mounted() {},

  computed: {},
  methods: {
    doSearch() {
      // this.showSearch = true;
      if (this.searchValue) {
        if (this.$store.state.isLogin) {
          let tmp_message = encodeURIComponent(this.searchValue);
          this.$router.push(`/goods?keyword=${tmp_message}`);
        } else {
          this.$dialog
            .confirm({
              title: "请先注册并登陆",
              message: "未登录用户只能获得优惠券，无法正常获取返利，请先登录！"
            })
            .then(() => {
              this.$router.push("/login");
            })
            .catch(() => {
              this.$toast("未登录用户只能获得优惠券");
            });
        }
      } else {
        this.$toast("请将淘口令或链接粘贴到文本框中");
      }
    },
    onLoad() {
      this.loading = false;
      //this.finished = true;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #eee;
  margin-bottom: 50px;
}
.home-swipe {
  box-sizing: border-box;
  padding: 4px 6px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
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
    padding: 5px;
  }
}
</style>