<template>
  <div class="alipay">
    <van-nav-bar title="推广记录" left-text="返回" left-arrow @click-left="$router.back()"/>
    <div style="margin-top:10px">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getLog">
        <van-panel
          v-for="item in tuiList"
          :key="item.id"
          :title="`${item.phone} (${item.name})`"
          :status="'返利总额：￥'+item.superiorfanli"
          style="margin-bottom:5px"
        >
          <div class="tui_content">
            <p>成交次数：{{item.tradecount}}</p>
            <p>推广人数：{{item.tuiCount}}</p>
          </div>
        </van-panel>
      </van-list>
      <no-data v-if="tuiList.length == 0&&!loading"></no-data>
    </div>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup, NavBar, Button, Panel } from "vant";
import NoData from "@/components/NoData";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Panel.name]: Panel,
    NoData
  },
  data() {
    return {
      loading: false,
      finished: false,
      tuiList: [],
      page: {
        currpage: 0,
        pagecount: 1
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getLog() {
      let _current = this.page.currpage + 1;
      let _url = "/tuilog/" + _current;
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
          this.tuiList = [...this.tuiList, ...data];
        }
        if (data.length < 20) {
          this.finished = true;
        }
      });
    },
    getDate(date_str) {
      return date_str.split(".")[0];
    }
  },
  filters: {
    getMoney(money) {
      let _money = Math.ceil(money * 100) / 100;
      return _money;
    }
  }
};
</script>

<style lang="less" scoped>
.alipay {
  z-index: 1000;
  padding-bottom: 55px;

  .van-panel__content {
    padding: 10px 15px;
    .tui_content {
      font-size: 13px;
      color: #999;
      display: flex;
      p {
        width: 50%;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
